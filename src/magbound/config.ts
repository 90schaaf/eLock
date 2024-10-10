import {config} from "../server";
import {process} from "./service";
import {RawData} from "ws";
import {WebSocket} from "ws";

export const magboundProxyConfig: config = {
    portNumber: 8080,
    commands:
        {
            onConnect: function onConnect(this: WebSocket) {
                console.log("Magbound connected")
                this.send(JSON.stringify({ message: "Welcome to the magbound server!" }))
            },
            onData: function (data: RawData) {
                try  {
                    const input = JSON.parse( data.toString());
                    console.log("Magbound data", input);
                    process(input);
                }
                catch(error: unknown)
                {
                    // handle error -> unlock lock
                }


            },

            // onData: (this: WebSocket, data: RawData) => {
            //     console.log("Magbound data", data);
            //     this.send("hello");
            // },
            onDisconnect: () => {console.log("Magbound disconnected xxx")},
            onError: (): void => console.log("Magbound error"),
        }
}