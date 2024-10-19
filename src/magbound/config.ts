import {process, sendChatMessage, handleError, unlock} from "./service";
import {RawData} from "ws";
import {WebSocket} from "ws";

export const magboundProxyConfig = {
    portNumber: 8080,
    commands:
        {
            onConnect: function onConnect(this: WebSocket) {
                console.log("Magbound connected")
                sendChatMessage("Welcome to a true selfbondage experience!", this, "System")
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
                await unlock();
                console.info("Xtoys client disconnected. Unlocked!")
            },
            onError: async function (this: WebSocket, error: unknown) { // TODO test this!
                await handleError("Some unexpected error " + error, this)
                console.error("Error while executing command ", error);
            }
        }
}