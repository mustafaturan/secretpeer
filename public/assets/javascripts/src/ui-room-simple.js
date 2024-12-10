let _debug = false;

let main = getEl('main');
let setup = getEl('setup');
let statusText = getEl('status');
let statusIndicator = getEl('status-indicator');
let messages = getEl('messages');
let message = getEl('message');
let cword1 = getEl('cword1');
let cword2 = getEl('cword2');
let cpin = getEl('cpin');
let ccword1 = getEl('ccword1');
let ccword2 = getEl('ccword2');
let ccpin = getEl('ccpin');
let notifications = getEl('notifications');
let qrCode = getEl('qrcode');
let qrImage = getEl('qrimage');

let keys = [];
let peer;

let files = {};

let peerSignalReceived = false;

const chunkSize = 8192;
const pageURL = window.location.href.split('#')[0];

let qr = null;

let historyState = {}

window.addEventListener('load', () => {
    if (window.location.protocol === 'http:' && !window.location.host.startsWith('localhost')) {
        window.location.protocol = 'https:';
        return;
    }

    setLanguage('en_US');

    qr = new QRious({element: qrCode, value: pageURL, size: 128});

    message.focus();
    let hashVal = window.location.href.split('#')[1];
    if (hashVal !== undefined && hashVal !== '') {
        message.innerText = '/' + decodeURI(hashVal);
        notify(`${lang['n_hash_command']}: ${message.innerText}`);
    }

    getEl('version-number').innerText = version;
});

message.addEventListener('paste', (event) => {
    event.preventDefault();

    const paste = (event.clipboardData || window.clipboardData).getData('text');
    message.innerText += paste;
});

message.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        var msg = message.innerText.trim();
        if (msg.startsWith('/')) {
            let cmd = msg.replace(/\s+/g, ' ').trim().split(' ');
            handleCommand(cmd[0].substring(1), cmd.slice(1));
        } else {
            cmdSend(msg);
        }
        message.innerText = '';
        message.focus();
    }
});

async function handleCommand(cmd, args) {
    if (lang === null) {
        setLanguage('en_US');
    }
    switch(cmd) {
        case 'help':
        case 'h':
            history.pushState(historyState, 'Help', '#help');
            cmdHelp();
            break;
        case 'privacy':
        case 'p':
            history.pushState(historyState, 'Privacy', '#privacy');
            cmdPrivacy();
            break;
        case 'clean':
        case 'clear':
        case 'n':
            history.pushState(historyState, 'Clear', '#clear');
            cmdClean();
            break;
        case 'file':
        case 'f':
            cmdFile();
            break;
        case 'create':
        case 'c':
            history.pushState(historyState, 'Chat room', '#room');
            cmdCreate();
            break;
        case 'join':
        case 'j':
            history.pushState(historyState, 'Chat room', '#room');
            cmdJoin(args);
            break;
        case 'leave':
        case 'quit':
        case 'exit':
        case 'q':
            history.pushState(historyState, 'secretpeer', '/');
            cmdLeave();
            break;
        case 'debug':
        case 'd':
            cmdDebug();
            break;
        case 'version':
        case 'v':
            history.pushState(historyState, 'App version', '#version');
            cmdVersion();
            break;
        default:
            notify(`${lang['n_unknown_command']}: ${cmd}`);
    }
}

async function cmdClean() {
    files = {};
    messages.innerHTML = '';
    showHide('messages');
}

async function cmdCreate() {
    await cmdClean();
    generate().then(() => {
        if (qr === null) {
            qr = new QRious({element: qrCode, value: pageURL, size: 128});
        }
        qr.set({value: encodeURI(pageURL + '#j ' + keys.join(' '))});
        qrImage.innerHTML = '';
        qrImage.appendChild(qr.image);
        messages.innerHTML = setup.innerHTML;
        if (lang === undefined) {
            setLanguage('en_US');
        }
        statusText.innerText = lang['status_initializing_signal'];
        prepare().then((result) => {
            [ls, room] = result;
            dial(ls, room);
            statusText.innerText = lang['status_waiting_participant'];
        });
    });
}

async function cmdJoin(args) {
    if (!words.includes(args[0])) {
        notify(`${lang['n_invalid_word']}#1: ${args[0]}`);
        throw new Error(`invalid word: ${args[0]}`);
    }
    if (!words.includes(args[1])) {
        notify(`${lang['n_invalid_word']}#2: ${args[1]}`);
        throw new Error(`invalid word: ${args[1]}`);
    }
    if (!(!isNaN(parseFloat(args[2])) && isFinite(args[2])) || args[2].length !== 6) {
        notify(`${lang['n_invalid_pin']}: ${args[2]}`);
        throw new Error(`pincode must be a 6 digit number! ${args[2]}`);
    }

    await cmdClean();
    prepare(args.slice(0,3)).then((result) => {
        [ls, room] = result;
        setTimeout(function() {
            answer(ls, room);
            statusText.innerText = lang['status_waiting_participant'];
        }, 1000);
    });
}

async function cmdFile() {
    if (!peer || !peer.isConnected) {
        notify(lang['n_peer_connection_needed_for_file_transfer']);
        throw new Error('peer connection is not established!');
    }
    let io = createEl('input');
    io.type = 'file';
    io.multiple = 'multiple';

    io.onchange = e => {
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            sendFileToPeer(file);
        }
    }

    io.click();
}

const sendFileToPeer = async (file) => {
    if (file.size === 0) {
        notify(lang['n_empty_file']);
        throw new Error('empty file transfer is not allowed!');
    }

    const id = newID();

    messages.appendChild(buildAttachmentNode('message-outgoing', id, '📎 ' + file.name + ` (${humanFileSize(file.size)})`));
    main.scrollTop = main.scrollHeight;

    peer.createFileDC(id, file.name, file.size);
    sleep(1000);

    let offset = 0;
    let reader = new FileReader();

    const readChunk = offset => {
        if (!peer || peer.isFailed) {
            // nothing we can do when the connection has failed
            notify(lang['n_peer_connection_failed']);
            return;
        }
        if (!peer.hasBuffer(id)) {
            sleep(1).then(() => {
                readChunk(file, offset);
            });
            if (_debug) {
                console.log('*** wait ', offset, chunkSize);
            }
            return;
        }
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
        peer.sendFile(id, bin);
        offset += bin.byteLength;

        const percentage = Math.round(offset / file.size * 100);
        const percentNode = getEl('p_' + id);
        percentNode.innerText = ' (' + percentage + '%)';

        if (offset < file.size) {
            readChunk(offset);
        } else {
            percentNode.remove();
            if (_debug) {
                console.log('*** file transfer completed');
            }
        }
    };

    readChunk(offset);
}

async function cmdSend(msg) {
    if (msg === '') {
        return;
    }
    if (!peer) {
        notify(lang['n_peer_connection_not_established']);
        throw new Error('peer is not initialized');
    }
    if (!peer.isConnected) {
        const status = lang['status_' + peer.connectionState];
        statusText.innerText = status;
        notify(status);
        throw new Error(`trying to send on connection state ${peer.connectionState}`);
    }
    const id = newID();
    peer.sendText({id: id, data: msg});
    messages.appendChild(buildNode('message-outgoing', id, msg));
    main.scrollTop = main.scrollHeight;
}

async function cmdLeave() {
    cmdClean();
    if (peer) {
        await peer.hangup();
    }
    notify('Please wait, reloading the window in a second!');
    setTimeout(function(){
        location.reload();
    },1000);
}

async function cmdDebug() {
    notify(lang['n_debug_enabled']);
    _debug = true;
    if (peer) {
        peer._debug = _debug;
    }
}

async function cmdVersion() {
    showHide('version');
}

async function cmdHelp() {
    showHide('help');
}

async function cmdPrivacy() {
    showHide('privacy');
}

async function notify(msg, log = _debug) {
    if (log) {
        console.log(`[notify] ${msg}`);
    }
    let notification = createEl('div');
    notification.classList.add('notification');
    notification.innerText = msg;
    notifications.appendChild(notification);
    setTimeout(function(){
        notifications.removeChild(notification);
    },4000);
}

async function subscribeToPeerEvents() {
    /*Messaging*/
    peer.on('onpeerconnected', function(_event) {
        if (statusText.innerText !== lang['status_connected']) {
            notify(lang['n_connected_to_peer']);
        }
        statusText.innerText = lang['status_connected'];
        statusIndicator.className = 'green';
    });
    peer.on('onpeerdisconnected', function(event) {
        if (event.status === 'failed') {
            notify(lang['n_failed_to_establish_connection']);
        } else if ((!peer || !peer.isConnected) && statusText.innerText !== lang['status_disconnected']) {
            notify(lang['n_disconnected_from_peer']);
        }
        statusText.innerText = peer && peer.isConnected ? lang['status_connected'] : lang['status_disconnected'];
        statusIndicator.className = 'red';
    });
    peer.on('onpeermessage', function(event) {
        receive(event.id, event.data);
    });
    peer.on('onpeerfilemetadata', function(event) {
        receiveFileMetadata(event.id, event.data);
    });
    peer.on('onpeerfile', function(event) {
        receiveFile(event);
    });

    /*Signal*/
    peer.on('onsignalopen', function(_event) {
        notify(lang['n_secret_room_created']);
    })
    peer.on('onsignalclose', function(_event) {
        if (peer && !peer.isConnected) {
            if (!peerSignalReceived) {
                notify(lang['n_nobody_joined_to_room']);
            } else {
                notify(lang['n_could_not_establish_peer_connection']);
            }
            statusText.innerText = lang['status_disconnected'];
            statusIndicator.className = 'red';
            peer.hangup();
            peer = null;
        }
    });
    peer.on('onsignalerror', function(event) {
        notify(lang['n_signaling_error']);
        statusText.innerText = lang['status_disconnected'];
        statusIndicator.className = 'red';
        peer.hangup();
        peer = null;
    });
    peer.on('onsignalmessage', function(event) {
        if (event.status === 'wait') {
            notify(lang['n_waiting_participant']);
        } else if (event.status === 'ready') {
            notify(lang['n_participant_joined']);
            handleCommand('clear');
            statusText.innerText = lang['status_connecting'];
            peerSignalReceived = true;
        }
        statusIndicator.className = 'yellow';
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

async function prepare(joinKeys = keys) {
    let ls;
    try {
        ls = new Locksmith(joinKeys[0], joinKeys[1], joinKeys[2]);
    } catch (e) {
        notify(lang['n_could_not_init_encryption_library']);
        statusText.innerText = lang['status_failed'];
        throw new Error(`Could not init encryption library: ${e.toString()}`);
    }
    if (ls === null) {
        return
    }

    if (peer !== undefined && peer !== null) {
        await peer.hangup();
        peer = null;
    }
    peerSignalReceived = false;
    let room;
    try {
        room = await ls.digest();
    } catch(e) {
        notify(lang['n_could_not_init_encryption_library']);
        statusText.innerText = lang['status_failed'];
        throw new Error(`Could not init encryption library: ${e.toString()}`);
    }

    return [ls, room];
}

async function dial(ls, room) {
    peer = new Caller(signalURL, configuration, room, ls, _debug);
    await subscribeToPeerEvents();
}

async function answer(ls, room) {
    peer = new Callee(signalURL, configuration, room, ls, _debug);
    await subscribeToPeerEvents();
    main.scrollTop = main.scrollHeight;
}

async function showHide(show) {
    for (let n of getEl('main-content').childNodes) {
        n.hidden = true;
    }
    getEl(show).hidden = false;
}

function receiveFileMetadata(id, metadata) {
    metadata['id'] = id;
    files[id] = {
        buffer: [],
        metadata: metadata,
        size: 0
    }
    if (_debug) {
        console.log('*** file metadata', files[id].metadata);
    }

    const node = buildAttachmentNode('message-incoming', id, '📎 ' + metadata.name + ` (${humanFileSize(files[id].metadata.size)})`);
    messages.appendChild(node);
    main.scrollTop = main.scrollHeight;
}

function receive(id, data) {
    messages.appendChild(buildNode('message-incoming', id, data));
    main.scrollTop = main.scrollHeight;
}

function receiveFile(event) {
    const id = event.id;
    const data = event.data;
    files[id].buffer.push(data);
    files[id].size += data.byteLength;
    const percentage = Math.round(files[id].size / files[id].metadata.size * 100);
    const percentNode = getEl('p_' + id);
    percentNode.innerText = ' (' + percentage + '%)';
    if (files[id].size === files[id].metadata.size) {
        const received = new Blob(files[id].buffer);
        let downloadAnchor = createEl('a');
        downloadAnchor.href = URL.createObjectURL(received);
        downloadAnchor.download = files[id].metadata.name;
        downloadAnchor.textContent =
          `${files[id].metadata.name} (${humanFileSize(files[id].metadata.size)})`;
        const node = getEl('m_' + id);
        node.innerHTML = '<span>📎 </span>';
        node.appendChild(downloadAnchor);
        node.appendChild(buildTime());
        peer.destroyFileDC(id);

        delete files[id];
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

function buildAttachmentNode(type, id, msg) {
    let node = createEl('div');
    node.classList.add('message');
    node.classList.add(type === 'message-outgoing' ? 'text-right' : 'text-left');
    node.classList.add('attachment');
    let input = createEl('div');
    input.classList.add(type)
    let content = buildContent(id, msg);
    content.appendChild(buildPercentage(id));
    content.appendChild(buildTime());
    input.appendChild(content);
    node.appendChild(input);
    return node;
}

function buildPercentage(id) {
    let percentNode = createEl('span');
    percentNode.id = 'p_' + id;
    percentNode.innerHTML = ' (0%)';
    return percentNode;
}

function buildTime() {
    let node = createEl('sub');
    node.classList.add('message-time')
    const date = new Date();
    node.innerText = pad2(date.getHours()) + ':' + pad2(date.getMinutes());
    return node;
}

function buildContent(id, msg) {
    let node = createEl('div');
    node.classList.add('content')
    node.id = 'm_' + id;
    node.innerText = msg;
    return node;
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
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

function getEl(id) {
    return document.getElementById(id);
}

function createEl(tag) {
    return document.createElement(tag);
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
