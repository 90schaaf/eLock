import {init} from "./server";
import {magboundProxyConfig} from "./magbound/config";
import {obsProxyConfig} from "./obs/config";

init(magboundProxyConfig);
init(obsProxyConfig);