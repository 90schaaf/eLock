import {WebSocket, WebSocketServer, RawData} from "ws";

type commands = {
    onConnect: (this: WebSocket) => void;
    onData: (this: WebSocket, data: RawData) => Promise<void>;
    onDisconnect: () => void;
    onError: (this: WebSocket, error: Error) => Promise<void>
}

export type config = {
    portNumber: number,
    commands: commands
}

export function init(config: config): void {
    const server = new WebSocketServer({port: config.portNumber});

    server.on('connection', socket => {
        config.commands.onConnect.call(socket);
        socket.on("close", config.commands.onDisconnect);
        socket.on("message", config.commands.onData)
        socket.on("error", config.commands.onError);
    })
}