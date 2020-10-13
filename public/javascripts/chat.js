class Chat {
    constructor(socket) {
        this.socket = socket;
    }

    sendMessage(room, text) {
        const message = {
            room: room,
            text: text
        };
        this.socket.emit('message', message);
    }

    changeRoom(room) {
        this.socket.emit('join', {
            newRoom: room
        });
    }

    processCommand(command) {
        const words = command.split(' ');
        command = words[0]
            .substring(1, words[0].length)
            .toLowerCase();

        let message = false;
        switch(command) {
            case 'join':
                words.shift();
                const room = words.join(' ');
                this.changeRoom(room);
                break;
            case 'nick':
                words.shift();
                const name = words.join(' ');
                this.socket.emit('nameAttempt', name);
                break;
            default:
                message = 'Unrecognized command.';
                break;
        }
        return message;
    }
}