import {config} from "../server";
import {RawData} from "ws";

export const magboundProxyConfig: config = {
    portNumber: 8080,
    commands:
        {
            onConnect: () => {
                console.log("Magbound connected")
                //this.send("Welcome to the magbound server!")
            },
            onData: function (data: RawData) {
                console.log("Magbound data", data);
                this.send("hello");
            },

            // onData: (this: WebSocket, data: RawData) => {
            //     console.log("Magbound data", data);
            //     this.send("hello");
            // },
            onDisconnect: () => {console.log("Magbound disconnected xxx")},
            onError: (): void => console.log("Magbound error"),
        }
}