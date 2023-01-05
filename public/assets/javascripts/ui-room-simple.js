let _debug = false;

let main = getEl('main');
let setup = getEl('setup');
let statusText = getEl('status');
let messages = getEl('messages');
let message = getEl('message');
let cword1 = getEl('cword1');
let cword2 = getEl('cword2');
let cpin = getEl('cpin');
let ccword1 = getEl('ccword1');
let ccword2 = getEl('ccword2');
let ccpin = getEl('ccpin');
let notification = getEl('notification');

let keys = [];
let roomDigest;
let peer;

let fileBuffer = [];
let fileSize = 0;
let fileMetadata = {};

let peerSignalReceived = false;

window.onload = (_event) => {
    if (window.location.protocol === 'http:' && !window.location.host.startsWith('localhost')) {
        window.location.protoco = 'https:';
        return;
    }

    message.focus();
    generate();
};

window.alert = (msg) => {
    notify(msg);
}

message.addEventListener('paste', (event) => {
    event.preventDefault();

    const paste = (event.clipboardData || window.clipboardData).getData('text');
    message.innerText += paste;
});

message.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        var msg = message.innerText.replace('&nbsp;', ' ').trim();
        if (msg === '') {
            msg.focus();
        } else if (msg.startsWith('/help')) {
            showHide('help');
        } else if (msg.startsWith('/privacy')) {
            showHide('privacy');
        } else if (msg.startsWith('/file')) {
            askFile();
        } else if (msg.startsWith('/clean') || msg.startsWith('/clear')) {
            fileBuffer = [];
            fileMetadata = {};
            fileSize = 0;
            messages.innerHTML = '';
            showHide('messages');
            generate();
        } else if (msg.startsWith('/create')) {
            fileBuffer = [];
            fileMetadata = {};
            fileSize = 0;
            messages.innerHTML = setup.innerHTML;
            statusText.innerText = 'waiting participant';
            showHide('messages');
            setTimeout(function() {
                dial();
            }, 15000);
        } else if (msg.startsWith('/join')) {
            const joinKeys = msg.split(' ').slice(1,4);
            if (!words.includes(joinKeys[0])) {
                notify(`Invalid word#1: ${joinKeys[0]}`);
                throw new Error(`invalid word: ${word1}`);
            }
            if (!words.includes(joinKeys[1])) {
                notify(`Invalid word#2: ${joinKeys[1]}`);
                throw new Error(`invalid word: ${joinKeys[1]}`);
            }
            if (!(!isNaN(parseFloat(joinKeys[2])) && isFinite(joinKeys[2])) || joinKeys[2].length !== 6) {
                notify(`Invalid pin (must 6 digit number): ${joinKeys[2]}`);
                throw new Error(`pincode must be a 6 digit number! ${joinKeys[2]}`);
            }

            fileBuffer = [];
            fileMetadata = {};
            fileSize = 0;
            messages.innerHTML = '';
            statusText.innerText = 'waiting participant';
            showHide('messages');
            answer(joinKeys);
        } else if (msg.startsWith('/leave') || msg.startsWith('/quit')) {
            fileBuffer = [];
            fileMetadata = {};
            fileSize = 0;
            messages.innerHTML = '';
            if (peer !== null && peer !== undefined) {
                peer.hangup();
                statusText.innerText = 'disconnected';
            }

            showHide('help');
            keys = KeyMaker.random();
        } else {
            if (peer === null || peer === undefined) {
                notify('Peer connection is not established');
                throw new Error('peer is not initialized');
            }
            if (!peer.isConnected && statusText.innerText === 'connected') {
                statusText.innerText = 'disconnected';
            }
            if (statusText.innerText !== 'connected') {
                notify(statusText.innerText);
                throw new Error(`connection state ${statusText.innerText}`);
            }
            send(msg);
        }
        main.scrollTop = main.scrollHeight;
        message.innerText = '';
        message.focus();
    }
});

async function notify(msg) {
    notification.classList.add('active');
    notification.innerText = msg;
    if (_debug) {
        console.log('[notify] ', msg);
    }
    setTimeout(function(){
        notification.classList.remove('active');
        notification.innerText = '';
    },2000);
}

async function subscribeToPeerEvents() {
    /*Messaging*/
    peer.on('onpeerconnected', function(_event) {
        statusText.innerText = 'connected';
        notify('Connected to the peer');
    });
    peer.on('onpeerdisconnected', function(_event) {
        statusText.innerText = peer && peer.isConnected ? 'connected' : 'disconnected';
        if (!peer || !peer.isConnected) {
            notify('Disconnected from the peer');
        }
    });
    peer.on('onpeermessage', function(event) {
        receive(event.id, event.data);
    });
    peer.on('onpeerfilemetadata', function(event) {
        receiveFileMetadata(event.id, event.data);
    });
    peer.on('onpeerfile', function(event) {
        receiveFile(event.data);
    });

    /*Signal*/
    peer.on('onsignalopen', function(_event) {
        notify('Secret room is created, waiting another participant to join!');
    })
    peer.on('onsignalclose', function(event) {
        if (!peerSignalReceived && !peer.isConnected) {
            notify('Nobody joined to room, signal is closed!');
            statusText.innerText = 'disconnected';
            peer.hangup();
            peer = null;
        } else if(peerSignalReceived && !peer.isConnected) {
            notify('Could not establish peer to peer connection');
            statusText.innerText = 'disconnected';
            peer.hangup();
            peer = null;
            peerSignalReceived = false;
        }
    });
    peer.on('onsignalerror', function(event) {
        notify('Something went wrong on signaling, please rejoin');
        statusText.innerText = 'disconnected';
        peer.hangup();
        peer = null;
    });
    peer.on('onsignalmessage', function(event) {
        if (event.status === 'wait') {
            notify('Waiting a participant to join to the room');
        } else if (event.status === 'ready') {
            notify('A participant joined to the room');
            statusText.innerText = 'connecting';
            peerSignalReceived = true;
        }
    });
}

async function generate() {
    keys = KeyMaker.random();
    cword1.innerText = keys[0];
    cword2.innerText = keys[1];
    cpin.innerText = keys[2];
    ccword1.innerText = keys[0];
    ccword2.innerText = keys[1];
    ccpin.innerText = keys[2];
}

async function dial() {
    let ls = new Locksmith(keys[0], keys[1], keys[2]);
    if (ls === null) {
        return
    }

    if (peer !== undefined && peer !== null) {
        peer.hangup();
        peer = null;
        peerSignalReceived = false;
    }
    peer = new Caller(wsServiceURL, configuration, await ls.digest(), ls, _debug);
    await subscribeToPeerEvents();
}

async function answer(keys) {
    let ls = new Locksmith(keys[0], keys[1], keys[2]);
    if (ls === null) {
        return
    }
    if (peer !== undefined && peer !== null) {
        peer.hangup();
        peer = null;
        peerSignalReceived = false;
    }
    peer = new Callee(wsServiceURL, configuration, await ls.digest(), ls, _debug);
    await subscribeToPeerEvents();
    main.scrollTop = main.scrollHeight;
}

function showHide(show) {
    for (let n of getEl('main-content').childNodes) {
        n.hidden = true;
    }
    getEl(show).hidden = false;
}

function askFile() {
    let io = createEl('input');
    io.type = 'file';

    io.onchange = e => {
        // getting a hold of the file reference
        let file = e.target.files[0];

        if (file.size === 0) {
            if (_debug) {
                console.log('emtpy file!');
            }
            notify('Empty files can not be transfered');
            return;
        }

        const id = newID();
        peer.sendText({id: id, data: {file: {name: file.name, size: file.size}}});

        messages.appendChild(buildNode('message-outgoing', id, '📎 ' + file.name + ` (${humanFileSize(file.size)})`));
        main.scrollTop = main.scrollHeight;

        peer.createFileDC();

        const chunkSize = 8192;
        let offset = 0;

        // setting up the reader
        let reader = new FileReader();

        const readChunk = offset => {
            if (_debug) {
                console.log('*** file load chunk ', offset, chunkSize);
            }
            const slice = file.slice(offset, offset + chunkSize);
            reader.readAsArrayBuffer(slice);
        };

        // here we tell the reader what to do when it's done reading...
        reader.onload = event => {
            if (_debug) {
                console.log('*** file chunk loaded', offset, chunkSize);
            }
            let bin = event.target.result;
            peer.sendFile(bin);
            offset += bin.byteLength;
            if (offset < file.size) {
                readChunk(offset);
            } else if (_debug) {
                console.log('*** file transfer completed');
                io = null;
            }
        }

        readChunk(0);
    }

    io.click();
}

function send(msg) {
    const id = newID();
    peer.sendText({id: id, data: msg});
    messages.appendChild(buildNode('message-outgoing', id, msg));
    main.scrollTop = main.scrollHeight;
}

function receiveFileMetadata(id, metadata) {
    fileMetadata = metadata;
    metadata['id'] = id;
    if (_debug) {
        console.log('*** file metadata', fileMetadata);
    }
    messages.appendChild(buildNode('message-incoming', id, '📎 ' + metadata.name));
    main.scrollTop = main.scrollHeight;
}

function receive(id, data) {
    messages.appendChild(buildNode('message-incoming', id, data));
    main.scrollTop = main.scrollHeight;
}

function receiveFile(data) {
    fileBuffer.push(data);
    fileSize += data.byteLength;
    if (fileSize === fileMetadata.size) {
        const received = new Blob(fileBuffer);
        let downloadAnchor = createEl('a');
        downloadAnchor.href = URL.createObjectURL(received);
        downloadAnchor.download = fileMetadata.name;
        downloadAnchor.textContent =
          `${fileMetadata.name} (${humanFileSize(fileMetadata.size)})`;
        const node = getEl('m_' + fileMetadata.id);
        node.innerHTML = '<span>📎 </span>';
        node.appendChild(downloadAnchor);
        node.appendChild(buildTime());
        peer.destroyFileDC();

        fileBuffer = [];
        fileSize = 0;
        fileMetadata = {};
        if (_debug) {
            console.log('***file tranfer completed');
        }
    }
}

function buildNode(type, id, msg) {
    let node = createEl('div');
    node.classList.add('message');
    node.classList.add(type === 'message-outgoing' ? 'text-right' : 'text-left');
    let input = createEl('div');
    input.classList.add(type)
    let content = buildContent(id, msg);
    content.appendChild(buildTime());
    input.appendChild(content);
    node.appendChild(input);
    return node;
}

function buildTime() {
    var node = createEl('sub');
    node.classList.add('message-time')
    const date = new Date();
    node.innerText = pad2(date.getHours()) + ':' + pad2(date.getMinutes());
    return node;
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

function buildContent(id, msg) {
    var node = createEl('div');
    node.classList.add('content')
    node.id = 'm_' + id;
    node.innerText = msg;
    return node;
}

function getEl(id) {
    return document.getElementById(id);
}

function createEl(tag) {
    return document.createElement(tag);
}

function newID() {
    return new Date().getTime() + random();
}

function random() {
    return (Math.floor(Math.random() * Math.floor(999999)) + '').padStart(6, '0');
}

function humanFileSize(bytes) {
    const thresh = 1000;
    const dp = 1;

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    const r = 10**dp;

    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}
