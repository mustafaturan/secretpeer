/*
Copyright (c) 2023 Mustafa Turan
https://github.com/mustafaturan
*/
// peer connection configuration
const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        }
    ],
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'negotiate'
};
let signalURL = new URL('https://signals.secretpeer.com/signals');

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

class FileDC extends EventBus {
    constructor(id, dc, debug) {
        super();
        // set debugging level
        this._debug = debug;

        this._id = id;
        this._dc = dc;
        this._dc.binaryType = 'arraybuffer';
        this._dc.bufferedAmountLowThreshold = 65535;
        this._dc.onclose = this.#_onDataChannelClose.bind(this);
        this._dc.onerror = this.#_onDataChannelError.bind(this);
        this._dc.onopen = this.#_onDataChannelOpen.bind(this);
        this._dc.onmessage = this.#_onDataChannelMessage.bind(this);
    }

    async sendFile(bin) {
        if (this._dc && this._dc.readyState === 'open') {
            if (!this.hasBuffer) {
                this._dc.onbufferedamountlow = () => {
                    this._dc.onbufferedamountlow = null;
                    this.sendFile(bin);
                };
                return;
            }

            try {
                this._dc.send(bin);
            } catch (e) {
                this._dc.onbufferedamountlow = () => {
                    this._dc.onbufferedamountlow = null;
                    this.sendFile(bin);
                };
                this.log(`[webrtc/fc] got error on sending file ${e.message}`);
            }
        } else {
            throw new Error(`[webrtc/fc] readystate for '${this._id}': ${this._dc ? this._dc.readyState : 'undefined'}`);
        }
    }

    async close() {
        if (this._dc && this._dc.readyState === 'open') {
            this._dc.close();
        }
    }

    get hasBuffer() {
        return this._dc.bufferedAmountLowThreshold >= this._dc.bufferedAmount;
    }

    async #_onDataChannelMessage(event) {
        this.emit('onpeerfile', {data: event.data, id: this._id});
        this.log(`[webrtc/fc] file content received for '${this._id}' with byte size '${event.data.byteLength}'`);
    }

    async #_onDataChannelOpen(_event) {
        this.log(`[webrtc/fc] file data channel opened for '${this._id}'`);
    }

    async #_onDataChannelClose(_event) {
        if (this._dc.readyState !== 'open') {
            this.emit('onfilechannelclose', {status: this._dc.readyState, id: this._id});
        }
        this.log(`[webrtc/fc] file data channel for '${this._id}' closed`);
    }

    async #_onDataChannelError(event) {
        if (this._dc.readyState !== 'open') {
            this.emit('onfilechannelerror', {status: this._dc.readyState, id: this._id});
        }
        this.logerror(`[webrtc/dc] file dc error occurred for '${this._id}' with err: '${event.error}'`);
    }

    log(msg) {
        if (this._debug) {
            console.log(msg);
        }
    }

    logerror(msg) {
        console.error(msg);
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

        // init file data channels
        this._fileDCs = {};

        // init signal ping count with 0
        this.#signalPingCount = 0;

        // peer connection
        this._pc = new RTCPeerConnection(configuration);
        this._pc.onicecandidate = this.#_onIceCandidate.bind(this);
        this._pc.onicegatheringstatechange = this.#_onIceCandidateGatheringStateChange.bind(this);
        this._pc.ondatachannel = this.#_onDataChannel.bind(this);
        this._pc.onconnectionstatechange = this.#_onConnectionStateChange.bind(this);
        this._pc.onnegotiationneeded = this.#onNegotiationNeeded.bind(this);

        this._signalURL = url;
    }

    async _sendSignal(signalMsg) {
        fetch(this._signalURL, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'reload',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'error',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(signalMsg)
        }).then(response => response.json().then(data =>
            this.log(`[signal] sent: ${JSON.stringify(signalMsg)}, got response: ${data.status}`)
        ));
    }

    async _querySignal(callbackFn) {
        const url = this._signalURL +
            '?room=' + this._room +
            '&intent=' + (this._whois === 'caller' ? 'answer' : 'offer') +
            '&nonce=' + Math.floor(Math.random() * Math.floor(999999));
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'reload',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'error',
            referrerPolicy: 'no-referrer',
        });

        if (response.ok) {
            this.emit('onsignalmessage', {status: 'ready'});
            let handleSignal = this.#handleSignal.bind(this);
            callbackFn = callbackFn.bind(this);
            response.json().then(signalMsg => {
                handleSignal(callbackFn, signalMsg);
            });
        } else if (this.#signalPingCount >= 20) {
            this.emit('onsignalclose', {status: 'failed'})
            return
        } else {
            setTimeout(function() {
                this._querySignal(callbackFn);
            }.bind(this),30000);
            this.#signalPingCount += 1;
            this.emit('onsignalmessage', {status: 'wait'});
        }
    }

    async #handleSignal(callbackFn, signalMsg) {
        const descCipher = this._locksmith.base64ToUint8Array(signalMsg.desc);
        const nonce = this._locksmith.base64ToUint8Array(signalMsg.nonce);
        const desc = await this._locksmith.decrypt(descCipher, nonce);
        await callbackFn(desc);
    }

    async sendText(text) {
        if (this._textDC && this._textDC.readyState === 'open') {
            this._textDC.send(JSON.stringify(text));
        } else {
            throw new Error(`[webrtc/tc] readystate: ${this._textDC ? this._textDC.readyState : 'undefined'}`);
        }
    }

    async sendFile(id, bin) {
        this._fileDCs[id].sendFile(bin);
    }

    async hangup() {
        if (this._textDC && this._textDC.readyState === 'open') {
            this._textDC.close();
        }
        this._textDC = null;

        for (const id in this._fileDCs) {
            await this._fileDCs[id].close();
            delete this._fileDCs[id];
        }
        this._fileDCs = {}

        if (this._pc) {
            this._pc.close();
        }
        this._pc = null;
    }

    async createFileDC(id, name, size) {
        let dc = this._pc.createDataChannel(this.labelPrefix(id, size) + name, {ordered: true});
        this._fileDCs[id] = new FileDC(id, dc, this._debug);
    }

    async destroyFileDC(id) {
        await this._fileDCs[id].close();
        delete this._fileDCs[id];
    }

    hasBuffer(id) {
        return this._fileDCs[id].hasBuffer;
    }

    get isConnected() {
        return this.connectionState === 'connected';
    }

    get connectionState() {
        let state = 'disconnected';
        if (this._pc) {
            state = this._pc.connectionState ? this._pc.connectionState : this._pc.iceConnectionState;
        }
        if (state === 'conected' && (!this._textDC || this._textDC.readyState !== 'open')) {
            state = 'waiting data channel';
        }
        if (state === 'connected' && this._textDC && (this._textDC.readyState === 'closed' || this._textDC.readyState === 'closing')) {
            state = this._textDC.readyState;
        }
        return state;
    }

    async _onSession(desc) {
        await this._pc.setLocalDescription(desc);
        this.log(`[webrtc/pc] local description set to: \n${desc.sdp}`);
    }

    async _onCreateSessionDescriptionError(error) {
        this.logerror(`[webrtc/pc] failed to create session description: '${error.toString()}'`);
    }

    async #_onConnectionStateChange(_event) {
        this.log(`[webrtc/pc] connection state changed '${this._pc.connectionState}' / '${this._pc.iceConnectionState}'`);
        const state = this.connectionState;

        if (state === 'connected') {
            this.emit('onpeerconnected', {status: 'connected'});
        } else if (state === 'disconnected'){
            this.emit('onpeerdisconnected', {status: this.connectionState});
        }
    }

    async #onNegotiationNeeded(_event) {
        this.log('on negotiation needed event received!')
    }

    /*
        ICE Candidate events
    */
    async #_onIceCandidate(event) {
        this.log(`[webrtc/pc] ICE candidate: ${event.candidate ? event.candidate.candidate : `null`}`);
    }

    async #_onIceCandidateGatheringStateChange(event) {
        if (this._pc.iceGatheringState === 'complete') {
            const encrypted = await this._locksmith.encrypt(JSON.stringify(this._pc.localDescription));
            let signalMsgSDP = {
                room:  this._room,
                intent: this._whois === 'caller' ? 'offer' : 'answer',
                desc: await this._locksmith.uint8ArrayToBase64(new Uint8Array(encrypted.chipher)),
                nonce: await this._locksmith.uint8ArrayToBase64(encrypted.nonce)
            };
            this._sendSignal(signalMsgSDP);
        }

        this.log(`[webrtc/pc] ICE candidate: ${event.candidate ? event.candidate.candidate : `null`}`);
    }

    async _onAddIceCandidateSuccess() {
        this.log('[webrtc/pc] successfully added ice candidate');
    }

    async _onAddIceCandidateError(error) {
        this.logerror(`[webrtc/pc] failed to add ice candidate: '${error.toString()}'`);
    }

    /* -----------------------------------------------------------------------*/
    _subscribeToDataChannelEvents(dc) {
        dc.onclose = this.#_onDataChannelClose.bind(this);
        dc.onerror = this.#_onDataChannelError.bind(this);
        dc.onopen = this.#_onDataChannelTextOpen.bind(this);
        dc.onmessage = this.#_onDataChannelText.bind(this);
    }

    /*
        Data channel events
    */
    async #_onDataChannel(event) {
        let dc = event.channel;
        this.log(`[webrtc/dc] data channel received: ${dc.label}`);

        if (dc.label === 'text') {
            this._textDC = dc;
            this._subscribeToDataChannelEvents(dc);
        } else if (dc.label.startsWith('file_')) {
            const label = dc.label.split('_', 3);
            const id = label[1];
            const size = Number(label[2]);
            const filename = dc.label.replace(this.labelPrefix(label[1], label[2]), '');
            this.emit('onpeerfilemetadata', {id: id, data: {name: filename, size: size}}).then(() => {
                this._fileDCs[id] = new FileDC(id, dc, this._debug);
                this._fileDCs[id].on('onpeerfile', function(event) {
                    this.emit('onpeerfile', event);
                }.bind(this));
            });
        }
    }

    async #_onDataChannelClose(_event) {
        if (this._textDC.readyState !== 'open') {
            this.emit('onpeerdisconnected', {status: this._textDC.readyState});
        }
        this.log(`[webrtc/dc] data channel closed (user closed: ${this._userClosed})`);
    }

    async #_onDataChannelError(event) {
        if (this._textDC.readyState !== 'open') {
            this.emit('onpeerdisconnected', {status: this._textDC.readyState});
        }
        this.logerror(`[webrtc/dc] dc error occurred: '${event.error}'`);
    }

    async #_onDataChannelText(event) {
        let msg = JSON.parse(event.data);
        this.emit('onpeermessage', {id: msg.id, data: msg.data});
        this.log(`[webrtc/tc] message received: '${event.data}'`);
    }

    async #_onDataChannelTextOpen(_event) {
        this.emit('onpeerconnected', {status: this._textDC.readyState});
        this.log('[webrtc/tc] text channel open');
    }

    labelPrefix(id, size) {
        this.log('file_' + id + '_' + size + '_');
        return 'file_' + id + '_' + size + '_';
    }

    log(msg) {
        if (this._debug) {
            console.log(msg);
        }
    }

    logerror(msg) {
        console.error(msg);
    }
}

class Caller extends PeerConnection {
    constructor(signal, configuration, room, ls, debug = false) {
        super('caller', signal, configuration, room, ls, debug);
        this.#dial();
        this._pc.onconnectionstatechange = this.#_onConnectionStateChange.bind(this);
    }

    async #createTextDC() {
        // create text data channel
        this._textDC = this._pc.createDataChannel('text', {ordered: true});
        this._subscribeToDataChannelEvents(this._textDC);
    }

    async #dial() {
        if (this._debug) {
            this.log(`[webrtc/tc] data channel created: '${this._room}'`);
        }

        await this.#createTextDC();

        await this._pc.createOffer().then(
            this._onSession.bind(this),
            this._onCreateSessionDescriptionError.bind(this)
        );
    }

    async #accept(answer) {
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
                this.logerror(`[webrtc/pc] error adding received ice candidate: '${e.toString()}'`);
            }

            this._candidates = [];
        }
    }

    async #_onConnectionStateChange(_event) {
        this.log(`[webrtc/pc] connection state changed '${this._pc.connectionState}' / '${this._pc.iceConnectionState}'`);
        const state = this.connectionState;

        if (state === 'connected') {
            this.emit('onpeerconnected', {status: 'connected'});
        } else if (state === 'disconnected'){
            this.emit('onpeerdisconnected', {status: this.connectionState});
        } else if (state === 'connecting') {
            this._querySignal(this.#accept);
        }
    }
}

class Callee extends PeerConnection {
    constructor(signal, configuration, room, ls, debug = false) {
        super('callee', signal, configuration, room, ls, debug);
        this._querySignal(this.#answer)
    }

    async #answer(offer) {
        let desc = new RTCSessionDescription(JSON.parse(offer));
        await this._pc.setRemoteDescription(desc);
        await this._pc.createAnswer().then(
            this._onSession.bind(this),
            this._onCreateSessionDescriptionError.bind(this)
        );
    }
}
