export const process =  (input: unknown): void => {
    if(isLockCommand(input))
    {
        if(isUnlockingCommand(input))
        {
            console.log("UNLOCKING")
            return;
        }

        if(isLockingCommand(input))
        {
            console.log("LOCKING");
            return
        }

        console.error("UNKNOWN LOCKING COMMAND", input);
        // TODO unlock lock

        return;
    }

    // check for other magbound commands like time or...
    console.log("INPUT IS *NOT* LOCK COMMAND", input);

}



type command = lock | unlock | time; // examples

type lock = {
    command: 'lock'
}

const locking = "locking";
const unloking = "unlocking";

type lockStates = typeof locking| typeof unloking
type lockCommand = {lockState: lockStates};
type lockingCommand = {lockState: typeof locking}
type unlockingCommand = {lockState: typeof unloking};

function isLockCommand(input: unknown): input is lockCommand {
    return (
        typeof input === 'object' &&
        input !== null &&
        'lockState' in input &&
        (input.lockState === locking || input.lockState === unloking)
    );
}

function isLockingCommand(command: lockCommand): command is lockingCommand  {
    return command.lockState === locking;
}

function isUnlockingCommand(command: lockCommand): command is unlockingCommand  {
    return command.lockState === unloking;
}

type unlock = {
    command: 'unlock'
}

type time = {
    command: 'time',
    seconds: number
}

