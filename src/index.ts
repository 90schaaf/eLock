import {config, init} from "./server";
import {RawData} from "ws";

const magboundProxyConfig: config = {
    portNumber: 8080,
    commands:
        {
            onConnect: () => {
                console.log("Magbound connected")
            },
            onData: (data: RawData) => {
                console.log("Magbound data", data);
            },
            onDisconnect: () => {console.log("Magbound disconnected")},
            onError: (): void => console.log("Magbound error"),
        }
}

init(magboundProxyConfig);