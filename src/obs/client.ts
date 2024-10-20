//https://github.com/obs-websocket-community-projects/obs-websocket-js

import OBSWebSocket, {OBSWebSocketError} from 'obs-websocket-js';

const obs: OBSWebSocket = new OBSWebSocket();

const init = async () => {
    await obs.connect('ws://192.168.1.131:4455', 'JZED16omlCrdSzmw').then(() => console.log("Connected with OBS"));
}

const switchToScene = async (scene: string) => {
    await obs.call("SetCurrentProgramScene", {
        'sceneName': scene
    }).catch((error: OBSWebSocketError) => {
        console.log(error);
    })
}

export default {init, switchToScene}