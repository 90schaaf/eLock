import {config} from "../server";
import {process, init} from "./service";
import {RawData} from "ws";
import {WebSocket} from "ws";
import client from "./client";

export const magboundProxyConfig: config = {
    portNumber: 8080,
    commands:
        {
            onConnect: function onConnect(this: WebSocket) {
                console.log("Magbound connected")
                this.send(JSON.stringify({ message: "Welcome to the magbound server!" }))
                this.send(JSON.stringify({ chat: "Welcome chat!" }))

                init(); // TODO maybe set xtoys to client.ts parameter values
            },
            onData: async function (this: WebSocket, data: RawData) {
                try {
                    const input = JSON.parse(data.toString());
                    await process(input, this).catch(error => {
                        // TODO::
                        //  * unlock!!
                        //  * send message to xtoys
                        console.error("Error while executing command ", error);
                    });
                } catch (error: unknown) {
                    // handle error -> unlock lock
                }


            },
            onDisconnect: () => {console.log("Magbound disconnected xxx")},
            onError: (): void => console.log("Magbound error"),
        }
}