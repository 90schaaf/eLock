const config = {
    baseUrl: "http://192.168.1.112",
    commands: { //https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
        lock: "setLock?t_state=1",
        unlock: "setLock?t_state=0",
        reset: "reset",
        state: "isAlive"
    }
}

const lock = async() => {
    console.info("LOCKING")
    await execute(config.commands.lock);
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

const execute = async(command: string) => {
    // try {
        const response = await fetch(config.baseUrl + "/" + command);
        const text = await response.text();

        console.log("RESPONSE LOCK", response);
        return text;
    // }
    // catch(error: unknown) {
    //     // TODO unlock -> check for recursion!
    //     console.error("Error while executing command " + command, error);
    // }
}

export default {lock, unlock, reset, state};