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
                    },
                    {
                        "type": "variableChange",
                        "actions": [
                            {
                                "key": "lockState",
                                "type": "updateComponent",
                                "value": "resetting",
                                "action": "setValue",
                                "channel": "generic-custom-toy-a",
                                "requiredExpression": "{trigger}==1"
                            }
                        ],
                        "variable": "reset",
                        "valueChange": true
                    },
                    {
                        "type": "variableChange",
                        "actions": [
                            {
                                "key": "lockTime",
                                "type": "updateComponent",
                                "value": "{lockTime}",
                                "action": "setValue",
                                "channel": "generic-custom-toy-a"
                            }
                        ],
                        "variable": "setTime",
                        "valueChange": null,
                        "requiredExpression": "{trigger}==1"
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
    },
    {
        "id": "reset",
        "up": "1",
        "down": "0",
        "name": "Reset",
        "type": "push",
        "value": "1",
        "description": "Unlocks and reset timer"
    },
    {
        "id": "lockTime",
        "name": "Lock time",
        "type": "timer",
        "value": null
    },
    {
        "id": "setTime",
        "up": "0",
        "down": "1",
        "name": "Set time",
        "type": "push",
        "value": "0"
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