{
    "initialActions": [
    {
        "job": "Main",
        "type": "updateJob",
        "action": "start"
    }
],
    "finalActions": [],
    "globalTriggers": [
    {
        "type": "variableChange",
        "actions": [
            {
                "key": "lockState",
                "type": "updateComponent",
                "value": "{lockState}",
                "action": "setValue",
                "channel": "generic-custom-toy-a"
            }
        ],
        "variable": "lockState"
    },
    {
        "key": "data",
        "type": "componentState",
        "event": "any",
        "actions": [
            {
                "type": "updateVariable",
                "value": "{trigger}",
                "variable": "message"
            }
        ],
        "channel": "generic-custom-toy-a",
        "parsedKey": "data"
    }
],
    "jobs": {
    "Main": {
        "steps": {
            "START": {
                "actions": [],
                    "triggers": []
            }
        }
    }
},
    "queues": [],
    "channels": {
    "generic-custom-toy-a": {
        "name": "Magbound Proxy",
            "type": "generic-custom-toy"
    }
},
    "controls": [
    {
        "id": "lockState",
        "up": "0",
        "down": "1",
        "name": "State",
        "type": "toggle",
        "value": "0"
    },
    {
        "id": "message",
        "name": "",
        "type": "textarea",
        "value": "-"
    }
],
    "controlPresets": [],
    "media": {
    "audio": {},
    "voices": {},
    "patterns": {}
},
    "customFunctions": ""
}