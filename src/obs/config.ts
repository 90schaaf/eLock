import {config} from "../server";

import {RawData} from "ws";
import {WebSocket} from "ws";
import {handleError, process, sendChatMessage, init} from "./service";

export const obsProxyConfig: config = {
    portNumber: 8081,
    commands: {
        onConnect: async function onConnect(this: WebSocket) {
            sendChatMessage("Welcome to an interactive experience where you can control my cameras as well.", this, "System")
            await init().catch(() => {
                console.error("Error: OBS probably not started");
                this.close();
            })
        },
        onData: async function (this: WebSocket, data: RawData) {
            try {
                const input = JSON.parse(data.toString());
                const command = input.command;

                await process(command, this).catch(async error => {
                    await handleError("Some error happen while processing command " + command, this)
                });
            } catch (error: unknown) {
                await handleError("Some error happen while processing data " + data, this)
                console.error("Error while executing command ", error);
            }
        },
        onDisconnect: async () => {
            console.info("Xtoys client disconnected:")
        },
        onError: async function(this, error) {
            await handleError("Some unexpected error " + error, this)
            console.error("Error while executing command ", error);
        }
    }
}