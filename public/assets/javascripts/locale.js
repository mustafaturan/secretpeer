const english = {
    // status
    'status_initializing_signal': 'initializing signal',
    'status_waiting_participant': 'waiting participant',
    'status_connected': 'connected',
    'status_disconnected': 'disconnected',
    'status_connecting': 'connecting',
    'status_failed': 'failed',

    // notifications
    'n_peer_connection_not_established': 'Peer connection is not established',
    'n_connected_to_peer': 'Connected to the peer',
    'n_failed_to_establish_connection': 'Failed to establish connection to remote peer!',
    'n_disconnected_from_peer': 'Disconnected from the peer',
    'n_secret_room_created': 'Secret room is created, waiting another participant to join!',
    'n_nobody_joined_to_room': 'Nobody joined to room, signal is closed!',
    'n_could_not_establish_peer_connection': 'Could not establish peer to peer connection',
    'n_signaling_error': 'Something went wrong on signaling, please rejoin',
    'n_waiting_participant': 'Waiting a participant to join to the room',
    'n_participant_joined': 'A participant joined to the room',
    'n_could_not_init_encryption_library': 'Could not init encryption library!',
    'n_invalid_word': 'Invalid word',
    'n_invalid_pin': 'Invalid pin (must be 6 digit number)',
    'n_peer_connection_needed_for_file_transfer': 'To send file, you need to establish connection to a peer!',
    'n_empty_file': 'Empty files can not be transfered',
    'n_unknown_command': 'Unknown command',
    'n_debug_enabled': 'Debug mode enabled!'
};

let lang;

function setLanguage(locale) {
    switch(locale) {
        case 'en_US':
            lang = english;
            break
        default:
            lang = english;
    }
}
