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
        "key": "message",
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
        "parsedKey": "message"
    },
    {
        "type": "variableChange",
        "variable": "lockState"
    }
],
    "jobs": {
    "Main": {
        "steps": {
            "START": {
                "actions": [],
                    "triggers": [
                    {
                        "type": "variableChange",
                        "actions": [
                            {
                                "key": "lockState",
                                "type": "updateComponent",
                                "value": "unlocking",
                                "action": "setValue",
                                "channel": "generic-custom-toy-a",
                                "requiredExpression": "{trigger}==0"
                            },
                            {
                                "key": "lockState",
                                "type": "updateComponent",
                                "value": "locking",
                                "action": "setValue",
                                "channel": "generic-custom-toy-a",
                                "requiredExpression": "{trigger}==1"
                            }
                        ],
                        "variable": "lockState"
                    }
                ]
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