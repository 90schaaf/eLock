const config = {
    baseUrl: "http://192.168.1.112",
    endpoints: {
        lock:
        {
            endpoint: "setLock",
            queryParams:
            {
                t_state: "1"
            }
        },
        unlock:
        {
            endpoint: "setUnlock",
            queryParams:
            {
                t_state: "0"
            }
        },
        reset: {
            endpoint: "reset",
        },
        liveness: {
            endpoint: "isAlive"
        },
        state: {
            endpoint: "getTimer",
        }
    }
}

const lock = async(milliseconds: number) => {
    const lock = config.endpoints.lock
    const query =  {...lock.queryParams, i_state: milliseconds.toString()}

    await execute(lock.endpoint, query);
}

const unlock = async () => {
    await execute( config.endpoints.unlock.endpoint);
}

const reset = async () => {
    await execute( config.endpoints.reset.endpoint);
}

const state = async() => {
    console.info("STATUS")
    await execute(config.endpoints.liveness.endpoint);
}

const getState = async () => {
    const response = await execute(config.endpoints.state.endpoint);
    const data = response.data.split(";");

    const remainingMilliseconds = Number(data[0]);
    const lockState = data[1];

    if(!isLockedOrUnlocked(lockState))
    {
        await unlock(); // something might be strange...
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

const execute = async(command: string, query?: Record<string, string>) => {
    const url = config.baseUrl + "/" + command + "?" +  new URLSearchParams(query);
    const response = await fetch(url);
        const text = await response.text();

        return {
            status: response.status,
            data: text};
}

export default {lock, unlock, reset, state, getState};