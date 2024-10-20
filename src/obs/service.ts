import {WebSocket} from "ws";
import client from "./client";

export const init= async () => {
    await client.init();
}

export const sendChatMessage = (message: string, webSocket: WebSocket, author?:string) => {
    message = author ? "** " + author + " **\n" + message: message;
    webSocket.send(JSON.stringify({ chat: message }))
}

// notifies chat & logs it
export async function handleError(message: string, webSocket: WebSocket) {
    const error = JSON.stringify({obsError: message});
    webSocket.send(error)

    console.error("Some error happened", error);
    sendChatMessage("Attention! Some error happened.\nError: " + error, webSocket, "System");
}

export const process = async (input: unknown, websocket: WebSocket) => {
    if(!isOBSCommand(input)) {
        return;
    }

    if(isSwitchSceneCommand(input)) {
        sendChatMessage("Switching to scene " + input.scene, websocket, "System");
        await client.switchToScene(input.scene);
        return;
    }

    console.error("Error: Could not process obs command ", input);
}

function isOBSCommand(input: unknown): input is obsCommand {
    return typeof input === 'object' &&
        input !== null &&
        'type' in input &&
        input.type === 'obs';
}

function isSwitchSceneCommand(command: obsCommand): command is switchSceneCommand {
    return 'scene' in command;
}

// commands
type obsCommand = {
    type: "obs";
}

type switchSceneCommand = obsCommand & {
    scene: string;
}

