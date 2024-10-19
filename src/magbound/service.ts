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
        console.log("A) ", secondsToBeLockedUp)
        secondsToBeLockedUp = securityConfig.limitLocktime(secondsToBeLockedUp);
        console.log("B) ", secondsToBeLockedUp)
        await client.lock(secondsToBeLockedUp*msInSeconds);
        syncTimer(websocket);

        return;
    }

    console.error("Error: Could not process magbound command ", input);
    // if(isLockCommand(input))
    // {
    //     if(isUnlockingCommand(input))
    //     {
    //         await client.unlock()
    //
    //         clearInterval(timeUpdater);
    //         return;
    //     }
    //
    //     if(isLockingCommand(input))
    //     {
    //         await client.lock();
    //
    //         websocket.send(JSON.stringify({aa: {bb: "cc", dd: "ee"}}))
    //
    //         timeUpdater = global.setInterval(async () => {
    //             const state = await client.getState();
    //             const message = {updateLocktime: state.remainingSeconds};
    //             websocket.send(JSON.stringify(message));
    //         },  1000);
    //
    //         return
    //     }
    //
    //     if(isResettingCommand(input)) {
    //         await client.reset();
    //         return;
    //     }
    //
    //     console.error("UNKNOWN LOCKING COMMAND", input);
    //     await client.reset();
    //
    //     return;
    // }
    //
    // if(isTimeCommand(input)) {
    //     // command does not lock magbound, only set time in code!
    //     await client.setExactLockTime(input.lockTime);
    //
    //     // console.error("UNKNOWN TIME COMMAND", input);
    //     // await client.reset();
    //
    //     return;
    // }
    //
    // // check for other magbound commands like time or...
    // console.log("UNKNOWN COMMAND", input);
}


async function unlock() {
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
            websocket.send(JSON.stringify(message));
        },  1000);
}

function sendError(message: string, webSocket: WebSocket) {
    const error = JSON.stringify({magboundError:message});
    webSocket.send(error)
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

//
// const locking = "locking";
// const unloking = "unlocking";
// const resetting = "resetting";
//
// type lockStates = typeof locking | typeof unloking | typeof resetting;
//
// type lockCommand = {lockState: lockStates};
// type timeCommand = {lockTime: number};
//
// type lockingCommand = {lockState: typeof locking}
// type unlockingCommand = {lockState: typeof unloking};
// type resettingCommand = {lockState: typeof resetting};
//
// function isLockCommand(input: unknown): input is lockCommand {
//     return (
//         typeof input === 'object' &&
//         input !== null &&
//         'lockState' in input &&
//         (input.lockState === locking || input.lockState === unloking || input.lockState === resetting)
//     );
// }
//
// function isTimeCommand(input: unknown): input is timeCommand {
//     return (
//         typeof input === 'object' &&
//         input !== null &&
//         'lockTime' in input
//     );
// }
//
// function isLockingCommand(command: lockCommand): command is lockingCommand  {
//     return command.lockState === locking;
// }
//
// function isUnlockingCommand(command: lockCommand): command is unlockingCommand  {
//     return command.lockState === unloking;
// }
//
// function isResettingCommand(command: lockCommand): command is resettingCommand  {
//     return command.lockState === resetting;
// }

