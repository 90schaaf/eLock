import client  from "./client";
import {WebSocket} from "ws";

let  timeUpdater: NodeJS.Timeout;

export const init = () => {
    client.init();
}

export const process =  async (input: unknown, websocket: WebSocket) => {
    if(isLockCommand(input))
    {
        if(isUnlockingCommand(input))
        {
            await client.unlock()

            clearInterval(timeUpdater);
            return;
        }

        if(isLockingCommand(input))
        {
            await client.lock();

            websocket.send(JSON.stringify({aa: {bb: "cc", dd: "ee"}}))

            timeUpdater = global.setInterval(async () => {
                const state = await client.getState();
                const message = {updateLocktime: state.remainingSeconds};
                websocket.send(JSON.stringify(message));
            },  1000);

            return
        }

        if(isResettingCommand(input)) {
            await client.reset();
            return;
        }

        console.error("UNKNOWN LOCKING COMMAND", input);
        await client.reset();

        return;
    }

    if(isTimeCommand(input)) {
        // command does not lock magbound, only set time in code!
        await client.setExactLockTime(input.lockTime);

        // console.error("UNKNOWN TIME COMMAND", input);
        // await client.reset();

        return;
    }

    // check for other magbound commands like time or...
    console.log("UNKNOWN COMMAND", input);
}


const locking = "locking";
const unloking = "unlocking";
const resetting = "resetting";

type lockStates = typeof locking | typeof unloking | typeof resetting;

type lockCommand = {lockState: lockStates};
type timeCommand = {lockTime: number};

type lockingCommand = {lockState: typeof locking}
type unlockingCommand = {lockState: typeof unloking};
type resettingCommand = {lockState: typeof resetting};

function isLockCommand(input: unknown): input is lockCommand {
    return (
        typeof input === 'object' &&
        input !== null &&
        'lockState' in input &&
        (input.lockState === locking || input.lockState === unloking || input.lockState === resetting)
    );
}

function isTimeCommand(input: unknown): input is timeCommand {
    return (
        typeof input === 'object' &&
        input !== null &&
        'lockTime' in input
    );
}

function isLockingCommand(command: lockCommand): command is lockingCommand  {
    return command.lockState === locking;
}

function isUnlockingCommand(command: lockCommand): command is unlockingCommand  {
    return command.lockState === unloking;
}

function isResettingCommand(command: lockCommand): command is resettingCommand  {
    return command.lockState === resetting;
}

