import {WebSocket, WebSocketServer, RawData} from "ws";

type commands = {
    onConnect: (this: WebSocket) => void
    onData: (this: WebSocket, data: RawData) => void
    onDisconnect?: (this: WebSocket) => void
    onError?: (this: WebSocket) => void
}

export type config = {
    portNumber: number,
    commands: commands
}

const x: commands = {
    onConnect: () => {},
    onData(this: WebSocket, data): void {
        this.send("")
    }
}


export function init(config: config): void {
    const server = new WebSocketServer({port: config.portNumber});

    // function xx(this: WebSocket, data: WebSocket.RawData, isBinary?: boolean): void  {
    //         this.send("hello");
    // }

    server.on('connection', socket => {
        config.commands.onConnect.call(socket);
        socket.on("message", config.commands.onData)
    })

}