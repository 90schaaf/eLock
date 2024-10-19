const config = {
    baseUrl: "http://192.168.1.112",
    maxMinutesLockedUp: 120, // absolute max lock time in minutes that can't be overwritten from xToys
    minutesDefaultLockTime: 2,
    commands: {
        //TODO:
        // * revamp lock / unlock / setTime commands -> all same endpoint "setLock" with different query params
        lock: "setLock?t_state=1",  // TODO should be able to be combined with setTime
        unlock: "setLock?t_state=0",
        setTime: "&i_state=", // does not work on it's own must be send with locking command
        reset: "reset",
        state: "isAlive",  // maybe better use getTimer
        getState: "getTimer"
    }
}

const init = () => {
   setDesiredLockTime(config.minutesDefaultLockTime);
}

let desiredMinutesLockedUp = 0;

const setDesiredLockTime = (desiredMinutesLockedUpIn: number): void => {
    desiredMinutesLockedUp = Math.min(desiredMinutesLockedUpIn, config.maxMinutesLockedUp);
    console.info("set desired time", desiredMinutesLockedUp);
}

const lock = async() => {
    const millisecondsToBeLockedUp = desiredMinutesLockedUp * 60 * 1000;

    console.info("LOCKING for " + desiredMinutesLockedUp + " minutes...")

    await execute(config.commands.lock + config.commands.setTime + millisecondsToBeLockedUp);
}

const unlock = async () => {
    console.info("UNLOCKING")
    await execute(config.commands.unlock)
}

const reset = async () => {
    console.info("RESET")
    await execute(config.commands.reset);
}

const state = async() => {
    console.info("STATUS")
    return await execute(config.commands.state);
}

const getState = async () => {
    const response = await execute(config.commands.getState);
    const data = response.data.split(";");

    const remainingMilliseconds = Number(data[0]);
    const lockState = data[1];

    if(!isLockedOrUnlocked(lockState))
    {
        throw new Error("Unknown lock state " + lockState); // TODO improve
    }

    return {
        remainingSeconds: remainingMilliseconds / 1000,
        state: lockState
    }
}

function isLockedOrUnlocked(input: string): input is "Locked" | "Unlocked" {
    return input === "Locked" || input === "Unlocked";
}

const setExactLockTime = (minutesToBeLockedUp: number) => {
    setDesiredLockTime(minutesToBeLockedUp);
}

const execute = async(command: string) => {
    // try {
    const url = config.baseUrl + "/" + command;
    console.log("calling " + url);
    const response = await fetch(url);
        const text = await response.text();

        return {
            status: response.status,
            data: text};
    // }
    // catch(error: unknown) {
    //     // TODO unlock -> check for recursion!
    //     console.error("Error while executing command " + command, error);
    // }
}


export default {lock, unlock, reset, state, setExactLockTime, getState, init};