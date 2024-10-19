import client  from "./client";
import {WebSocket} from "ws";

let  timeUpdater: NodeJS.Timeout;

const msInSeconds = 1000;
const minutesInSeconds = 60;

const securityConfig = {
    maxLockedUp: 120 /*min*/ * minutesInSeconds, // absolute max lock time  that can't be overwritten from xToys
    defaultLockTime: 2 /*min*/ * minutesInSeconds,
    limitLocktime: (seconds: number) =>  {
        return Math.min(seconds, securityConfig.maxLockedUp);
    }
}

export const process =  async (input: unknown, websocket: WebSocket) => {
    if(!isMagboundCommand(input))
    {
        return;
    }

    if(isUnlockCommand(input)) {
        await unlock();
        return;
    }

    if(isLockCommand(input))
    {
        let secondsToBeLockedUp = securityConfig.defaultLockTime;

        if(isFixedTimeLockCommand(input))
        {
            secondsToBeLockedUp = input.secondsToBeLockedUp;
        }

        if(isRandomTimeLockCommand(input))
        {
            secondsToBeLockedUp = randomize(input)
        }

        secondsToBeLockedUp = securityConfig.limitLocktime(secondsToBeLockedUp);

        await client.lock(secondsToBeLockedUp*msInSeconds);
        syncTimer(websocket);

        return;
    }

    console.error("Error: Could not process magbound command ", input);
   }


export async function unlock() {
    await client.unlock();
    clearInterval(timeUpdater);
}

function randomize(input: randomTimeLockCommand): number {
    const lower = Math.min(input.lowerSecondsLockedUpLimit, input.upperSecondsLockedUpLimit);
    const upper = Math.max(input.lowerSecondsLockedUpLimit, input.upperSecondsLockedUpLimit);

    // Ensure the upper bound is inclusive and the result is an integer
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

function syncTimer(websocket: WebSocket) {
        timeUpdater = global.setInterval(async () => {
            const state = await client.getState();
            const message = {updateLocktime: state.remainingSeconds};

            if(!message.updateLocktime)
            {
                clearInterval(timeUpdater);
            }

            websocket.send(JSON.stringify(message));
        },  1000);
}

// notifies chat, send unlock command & logs it
export async function handleError(message: string, webSocket: WebSocket) {
    const error = JSON.stringify({magboundError: message});
    webSocket.send(error)

    console.error("Some error happened", error);
    sendChatMessage("Attention! Some error happened", webSocket, "System");
    sendChatMessage("Error: ", webSocket, "System");
    sendChatMessage("Unlocking lock. Please hold on...", webSocket, "System");
    await unlock();
    sendChatMessage("...Lock unlocked! @chat please check if captive is ok!", webSocket, "System");
}

export function sendChatMessage(message: string, webSocket: WebSocket, author?:string,) {
    message = author ? "** " + author + " **\n" + message: message;
    webSocket.send(JSON.stringify({ chat: message }))
}

function isMagboundCommand(input: unknown): input is magboundCommand {
    return typeof input === 'object' &&
        input !== null &&
        'type' in input &&
        input.type === 'magbound';
}

function isUnlockCommand(command: magboundCommand): command is unlockCommand {
    return 'lockState' in command && command.lockState == lockStateUnlocked;
}

function isLockCommand(command: magboundCommand): command is lockCommand {
    return 'lockState' in command && command.lockState == lockStateLocked;
}

function isFixedTimeLockCommand(command: lockCommand): command is fixedTimeLockCommand {
    return 'secondsToBeLockedUp' in command;
}

function isRandomTimeLockCommand(command: magboundCommand): command is randomTimeLockCommand {
    return 'lowerSecondsLockedUpLimit' in command && 'upperSecondsLockedUpLimit' in command;
}


// lock states
const lockStateUnlocked = "unlocked";
const lockStateLocked = "locked";

// commands
type magboundCommand = {
    type: "magbound";
}

type unlockCommand  =  magboundCommand & {
    lockState: typeof lockStateUnlocked;
}

type lockCommand  =  magboundCommand & {
    lockState: typeof lockStateLocked;
}

type fixedTimeLockCommand = lockCommand & {
    secondsToBeLockedUp: number;
}

type randomTimeLockCommand = lockCommand & {
    lowerSecondsLockedUpLimit: number;
    upperSecondsLockedUpLimit: number;
}