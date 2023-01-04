/*
Copyright (c) 2023 Mustafa Turan
https://github.com/mustafaturan
*/
// peer connection configuration
const configuration = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        }
    ],
    bundlePolicy: "max-bundle",
    rtcpMuxPolicy: "negotiate"
};
let wsServiceURL =
    (window.location.protocol === 'https:' ? 'wss' : 'ws') +
    "://signals.herokuapp.com/socket";

class EventBus extends EventTarget {
    async on(type, fn) {
        this.addEventListener(type, function(event) {
            fn(event.detail);
        });
    }

    async emit(type, data) {
        const ce = new CustomEvent(type, {detail: data});
        this.dispatchEvent(ce);
    }
}

class PeerConnection extends EventBus {
    #signalPingCount;

    constructor(whois, url, configuration, room, locksmith, debug) {
        super();

        // set debugging level
        this._debug = debug;

        // caller / callee
        this._whois = whois;

        // room name
        this._room = room;

        // encryption / decryption service
        this._locksmith = locksmith;

        // is user closed the connection
        this._userClosed = false;

        // init candidates
        this._candidates = [];

        // init data channel
        this._textDC = null;

        // peer connection
        this._pc = new RTCPeerConnection(configuration);
        this._pc.onicecandidate = this._onIceCandidate.bind(this);
        this._pc.ondatachannel = this._onDataChannel.bind(this);
        this._pc.onconnectionstatechange = this._onConnectionStateChange.bind(this);

        this._signal = new WebSocket(url);
        this._signal.onopen = this.#_onSignalOpen.bind(this);
        this._signal.onmessage = this.#_onSignalMessage.bind(this);
        this._signal.onclose = this.#_onSignalClose.bind(this);
        this._signal.onerror = this.#_onSignalError.bind(this);

        this._onSignalMessage =  this.#_onSignalMessage;
    }

    #_onSignalOpen() {
        if (this._debug) {
            console.log('[signal] opened');
        }
        const signalMsgIntent = {
            room: this._room,
            intent: this._whois
        }

        this._sendSignal(signalMsgIntent);
        this.#signalPingCount = 0;
        this.#_pingSignal();
        this.emit('onsignalopen', {status: 'wait'});
    }

    #_onSignalClose() {
        if (this._debug) {
            console.log('[signal] closed');
        }
        if (!this._pc.isConnected) {
            this.emit('onsignalclose', {status: 'failed'});
        }
    }

    #_onSignalError(event) {
        console.error(`[signal] error: ${event.data}`);
        this.emit('onsignalerror', {status: 'error'});
    }

    async #_onSignalMessage(signalMsg) {
        if (signalMsg.candidate) {
            const icecandidate = await this._locksmith.decrypt(signalMsg.candidate, signalMsg.nonce);
            if (this._debug) {
                console.log('received ice candidate from signal:', icecandidate);
            }
            let candidate = JSON.parse(icecandidate);
            if (this._pc.remoteDescription !== null) {
                try {
                    await this._pc
                        .addIceCandidate(candidate)
                        .then(
                            this._onAddIceCandidateSuccess.bind(this),
                            this._onAddIceCandidateError.bind(this)
                        );
                } catch (e) {
                    console.error('error adding received ice candidate', e);
                }
            } else {
                this._candidates.push(candidate);
            }
        }
    }

    async #_pingSignal() {
        setTimeout(function(){
            if (this._signal.readyState !== WebSocket.CLOSED && this.#signalPingCount < 5) {
                this._sendSignal({room: this._room, intent: 'ping'});
                this.#_pingSignal();
            }
        }.bind(this),50000);
        this.#signalPingCount += 1;
    }

    async _sendSignal(signalMsg) {
        this._signal.send(JSON.stringify(signalMsg));
        if (this._debug) {
            console.log(`[signal] sent: ${JSON.stringify(signalMsg)}`);
        }
    }

    async sendText(text) {
        if (this._textDC !== undefined && this._textDC !== null && this._textDC.readyState === 'open') {
            this._textDC.send(JSON.stringify(text));
        } else {
            throw new Error(`textdc readystate: ${this._textDC ? this._textDC.readyState : 'undefined'}`);
        }
    }

    async sendFile(bin) {
        if (this._fileDC !== undefined && this._fileDC !== null && this._fileDC.readyState === 'open') {
            this._fileDC.send(bin);
        } else {
            throw new Error(`filedc readystate: ${this._fileDC ? this._fileDC.readyState : 'undefined'}`);
        }
    }

    async hangup() {
        if (this._signal.readyState === WebSocket.OPEN) {
            this._signal.close();
        }
        if (this._textDC !== undefined && this._textDC !== null && this._textDC.readyState === 'open') {
            this._textDC.close();
        }
        if (this._fileDC !== undefined && this._fileDC !== null && this._fileDC.readyState === 'open') {
            this._fileDC.close();
        }
        this._pc.close();
    }

    async createFileDC() {
        this._fileDC = this._pc.createDataChannel('file', {ordered: true});
        this._subscribeToDataChannelEvents(this._fileDC);
    }

    async destroyFileDC() {
        if (this._fileDC !== undefined && this._fileDC !== null && this._fileDC.readyState === 'open') {
            this._fileDC.close();
        }
    }

    get isConnected() {
        if (this._textDC !== undefined && this._textDC !== null && this._pc !== null && this._pc !== undefined) {
            return this._textDC.readyState === 'open' && this._pc.connectionState == 'connected'
        }
        return false;
    }

    async _onSession(desc) {
        await this._pc.setLocalDescription(desc);
        if (this._debug) {
            console.log(`local description set to: \n${desc.sdp}`);
        }
    }

    async _onCreateSessionDescriptionError(error) {
        console.error(`failed to create session description: ${error.toString()}`);
    }

    async _onConnectionStateChange(_event) {
        if (this._debug) {
            console.log('connection state changed', this._pc.connectionState, this._pc.iceConnectionState);
        }
        if (this._pc.connectionState === 'connected' && this._pc.iceConnectionState === 'connected') {
            this._signal.close();
        }
    }

    /*
        ICE Candidate events
    */
    async _onIceCandidate(event) {
        if (this._pc.remoteDescription !== null) {
            try {
                await this._pc
                    .addIceCandidate(event.candidate)
                    .then(
                        this._onAddIceCandidateSuccess.bind(this),
                        this._onAddIceCandidateError.bind(this)
                    );
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }
        } else {
            this._candidates.push(event.candidate);
        }

        if (event.candidate !== null && event.candidate !== undefined && event.candidate.candidate !== null) {
            const encrypted = await this._locksmith.encrypt(JSON.stringify(event.candidate));
            let signalMsgCandidate = {
                room:  this._room,
                intent: 'candidate_' + this._whois,
                desc: new Uint8Array(encrypted.chipher).toString(),
                nonce: encrypted.nonce.toString()
            };
            this._sendSignal(signalMsgCandidate);
        }

        if (this._debug) {
            console.log(`ICE candidate: ${event.candidate ? event.candidate.candidate : `null`}`);
        }
    }

    async _onAddIceCandidateSuccess() {
        if (this._debug) {
            console.log('addIceCandidate success');
        }
    }

    async _onAddIceCandidateError(error) {
        if (this._debug) {
            console.log(`failed to add Ice Candidate: ${error.toString()}`);
        }
    }

    /* -----------------------------------------------------------------------*/
    _subscribeToDataChannelEvents(dc) {
        dc.onclose = this._onDataChannelClose.bind(this);
        dc.onerror = this._onDataChannelError.bind(this);
        if (dc.label === 'text') {
            dc.onopen = this._onDataChannelTextOpen.bind(this);
            dc.onmessage = this._onDataChannelText.bind(this);
        } else if (dc.label === 'file') {
            dc.onopen = this._onDataChannelFileOpen.bind(this);
            dc.onmessage = this._onDataChannelFile.bind(this);
        }
    }

    /*
        Data channel events
    */
    async _onDataChannel(event) {
        let dc = event.channel;
        this._subscribeToDataChannelEvents(dc);
        if (this._debug) {
            console.log(`data channel received: ${dc.label}`);
        }

        if (dc.label === 'text') {
            this._textDC = dc;
        } else if (dc.label === 'file') {
            this._fileDC = dc;
        }
    }

    async _onDataChannelClose(event) {
        if (this._textDC.readyState !== 'open') {
            this.emit('onpeerdisconnected', {status: this._textDC.readyState});
        }
        if (this._debug) {
            console.log('data channel closed', this._userClosed);
        }
    }

    async _onDataChannelError(event) {
        if (this._textDC.readyState !== 'open') {
            this.emit('onpeerdisconnected', {status: this._textDC.readyState});
        }
        console.error(`dc error occurred: '${event.error}'`);
    }

    async _onDataChannelText(event) {
        let msg = JSON.parse(event.data);
        if (msg.data.file) {
            this.emit('onpeerfilemetadata', {id: msg.id, data: msg.data.file});
        } else {
            this.emit('onpeermessage', {id: msg.id, data: msg.data});
        }
        if (this._debug) {
            console.log(`message received: '${event.data}'`);
        }
    }

    async _onDataChannelFile(event) {
        if (this._textDC.readyState === 'open') {
            this.emit('onpeerfile', {data: event.data});
        }
        if (this._debug) {
            console.log(`file content received with byte size '${event.data.byteLength}'`);
        }
    }

    async _onDataChannelTextOpen(_event) {
        this.emit('onpeerconnected', {status: this._textDC.readyState});
        if (this._debug) {
            console.log('text channel open');
        }
    }

    async _onDataChannelFileOpen(_event) {
        if (this._debug) {
            console.log('file channel open');
        }
    }
}

class Caller extends PeerConnection {
    constructor(signal, configuration, dataChannelLabel, ed, debug = false) {
        super('caller', signal, configuration, dataChannelLabel, ed, debug);
        this._signal.onmessage = this.onmessage.bind(this);
    }

    async onmessage(event) {
        if (this._debug) {
            console.log(`[signal] received: ${event.data}`);
        }

        let signalMsg = JSON.parse(event.data);

        if (signalMsg.state) {
            switch(signalMsg.state) {
                case 'ready':
                    this.emit('onsignalmessage', {status: 'ready'});
                    this.dial();
                    break;
                case 'wait':
                    this.emit('onsignalmessage', {status: 'wait'});
                    break;
            }
            return
        }

        if (signalMsg.desc) {
            const desc = await this._locksmith.decrypt(signalMsg.desc, signalMsg.nonce);
            await this.accept(desc);
            return
        }

        this._onSignalMessage(signalMsg);
    }

    async createTextDC() {
        // create text data channel
        this._textDC = this._pc.createDataChannel('text', {ordered: true});
        this._subscribeToDataChannelEvents(this._textDC);
    }

    async dial() {
        if (this._debug) {
            console.log(`data channel created: '${this._room}'`);
        }

        await this.createTextDC();


        await this._pc.createOffer().then(
            this._onSession.bind(this),
            this._onCreateSessionDescriptionError.bind(this)
        );

        const encrypted = await this._locksmith.encrypt(JSON.stringify(this._pc.localDescription));
        let signalMsgOffer = {
            room: this._room,
            intent: 'offer',
            desc: new Uint8Array(encrypted.chipher).toString(),
            nonce: encrypted.nonce.toString()
        };
        this._sendSignal(signalMsgOffer);
    }

    async accept(answer) {
        let desc = new RTCSessionDescription(JSON.parse(answer));
        await this._pc.setRemoteDescription(desc);
        for (const candidate of this._candidates) {
            try {
                await this._pc
                    .addIceCandidate(candidate)
                    .then(
                        this._onAddIceCandidateSuccess.bind(this),
                        this._onAddIceCandidateError.bind(this)
                    );
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }

            this._candidates = [];
        }
    }
}

class Callee extends PeerConnection {
    constructor(signal, configuration, dataChannelLabel, ed, debug = false) {
        super('callee', signal, configuration, dataChannelLabel, ed, debug);
        this._signal.onmessage = this.onmessage.bind(this);
    }

    async onmessage(event) {
        if (this._debug) {
            console.log(`[signal] received: ${event.data}`);
        }

        let signalMsg = JSON.parse(event.data);

        // handle state
        if (signalMsg.state) {
            return;
        }

        // handle description
        if (signalMsg.desc) {
            const desc = await this._locksmith.decrypt(signalMsg.desc, signalMsg.nonce);
            await this.answer(desc);
            return;
        }

        this._onSignalMessage(signalMsg);
    }

    async answer(offer) {
        let desc = new RTCSessionDescription(JSON.parse(offer));
        await this._pc.setRemoteDescription(desc);
        await this._pc.createAnswer().then(
            this._onSession.bind(this),
            this._onCreateSessionDescriptionError.bind(this)
        );

        const encrypted = await this._locksmith.encrypt(JSON.stringify(this._pc.localDescription));
        let signalMsgAnswer = {
            room: this._room,
            intent: 'answer',
            desc: new Uint8Array(encrypted.chipher).toString(),
            nonce: encrypted.nonce.toString()
        };
        this._sendSignal(signalMsgAnswer);
    }
}
