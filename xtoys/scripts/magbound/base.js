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
        "key": "updateLocktime",
        "type": "componentState",
        "event": "any",
        "actions": [
            {
                "type": "updateVariable",
                "value": "{trigger}",
                "variable": "locktime"
            }
        ],
        "channel": "generic-custom-toy-a",
        "parsedKey": "updateLocktime"
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
                                "code": "unlock();",
                                "type": "customCode",
                                "resultVar": "result",
                                "storeResult": false,
                                "requiredExpression": "{trigger}==\"Unlock\""
                            },
                            {
                                "code": "lock()",
                                "type": "customCode",
                                "resultVar": "result",
                                "storeResult": false,
                                "requiredExpression": "{trigger} == \"Lock\""
                            }
                        ],
                        "variable": "lockState"
                    },
                    {
                        "type": "variableChange",
                        "actions": [
                            {
                                "code": "sendTestCommand();\n\na={\n    \"time\": 1234,\n    \"status\": \"test\"\n}\nJSON.stringify(a)",
                                "type": "customCode",
                                "resultVar": "output",
                                "variables": [],
                                "requiredExpression": "{trigger}==1"
                            }
                        ],
                        "variable": "test"
                    },
                    {
                        "type": "variableChange",
                        "actions": [
                            {
                                "key": "test",
                                "type": "updateComponent",
                                "value": "{output}",
                                "action": "setValue",
                                "channel": "generic-custom-toy-a"
                            }
                        ],
                        "variable": "output"
                    }
                ]
            }
        }
    }
},
    "queues": [],
    "channels": {
    "generic-custom-toy-a": {
        "name": "Magbound",
            "type": "generic-custom-toy"
    }
},
    "controls": [
    {
        "name": "Mode",
        "type": "header",
        "description": "To setup lock it must be unlocked first"
    },
    {
        "id": "mode",
        "name": "Mode",
        "type": "multi-toggle",
        "value": "Fix time",
        "options": [
            "Fix time",
            "Random time"
        ],
        "requiredExpression": "{lockState}!=\"Lock\""
    },
    {
        "name": "Fix time",
        "type": "header",
        "requiredExpression": "  {mode}==\"Fix time\" and {lockState}!=\"Lock\""
    },
    {
        "id": "timeToLock",
        "name": "Locktime",
        "type": "timer",
        "value": "{mode}"
    },
    {
        "name": "Random time",
        "type": "header",
        "requiredExpression": "{mode}==\"Random time\" and {lockState}!=\"Lock\""
    },
    {
        "id": "lower_timeToLock",
        "name": "Lower lock time limit",
        "type": "timer"
    },
    {
        "id": "upper_timeToLock",
        "name": "Upper locktime limit",
        "type": "timer"
    },
    {
        "name": "Lock",
        "type": "header"
    },
    {
        "id": "lockState",
        "up": "Unlock",
        "down": "Lock",
        "type": "toggle",
        "value": "Unlock"
    },
    {
        "id": "locktime",
        "name": "Remaining time",
        "type": "timer",
        "requiredExpression": "{lockState}==\"Lock\""
    },
    {
        "id": "test",
        "up": "1",
        "down": "0",
        "name": "test",
        "type": "push",
        "value": "1"
    }
],
    "controlPresets": [],
    "media": {
    "audio": {},
    "voices": {},
    "patterns": {}
},
    "customFunctions": "function sendTestCommand() {\n//callAction({\"type\":\"updateComponent\",\"channel\":\"generic-custom-toy-a\",\"action\":\"setValue\",\"key\":\"testJS\",\"value\":\"hi\"});\ncallAction({\"type\":\"updateComponent\",\"channel\":\"generic-custom-toy-a\",\"action\":\"setValue\",\"key\":\"testJS\",\"value\":{test:\"hiJs\", test2: \"what?\"}});\n}\n\n\nfunction lock() {\n    sendData({lockState: \"locking\"})\n}\n\n\nfunction unlock() {\n    sendData({lockState: \"unlocking\"})\n}\n\n\nfunction sendData(data) {\n    callAction({\"type\":\"updateComponent\",\"channel\":\"generic-custom-toy-a\",\"action\":\"setValue\",\"key\":\"command\", \"value\":data});\n}\n"
}