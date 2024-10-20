{
    "initialActions": [
    {
        "type": "updateVariable",
        "value": "1",
        "variable": "count"
    }
],
    "finalActions": [],
    "globalTriggers": [
    {
        "type": "variableChange",
        "actions": [
            {
                "job": "Main",
                "type": "updateQueue",
                "queue": "speaking",
                "action": "add",
                "variables": [
                    {
                        "name": "message",
                        "expression": "This is a test"
                    }
                ]
            }
        ],
        "variable": "add",
        "requiredExpression": "{add}==1"
    }
],
    "jobs": {
    "Main": {
        "steps": {
            "START": {
                "actions": [
                    {
                        "text": "{queue-message} {count}",
                        "type": "updateComponent",
                        "action": "setText",
                        "channel": "speech-synthesis-a"
                    },
                    {
                        "type": "updateVariable",
                        "value": "+1",
                        "variable": "count"
                    },
                    {
                        "part": "timer",
                        "type": "updateScript",
                        "seconds": "2",
                        "requiredExpression": "{timer}"
                    }
                ],
                    "triggers": [
                    {
                        "type": "stepState",
                        "event": "actionsComplete",
                        "actions": [
                            {
                                "job": "Main",
                                "type": "updateJob",
                                "action": "stop"
                            }
                        ]
                    }
                ]
            }
        }
    },
    "FillQueue": {
        "steps": {
            "START": {
                "actions": [
                    {
                        "job": "Main",
                        "type": "updateQueue",
                        "queue": "speaking",
                        "action": "add",
                        "variables": [
                            {
                                "name": "message",
                                "expression": "This is test numer {count}"
                            }
                        ]
                    },
                    {
                        "type": "updateVariable",
                        "value": "+1",
                        "variable": "counter"
                    },
                    {
                        "job": "Main",
                        "type": "updateJob",
                        "action": "start",
                        "restart": true
                    }
                ],
                    "triggers": [
                    {
                        "type": "expressionState",
                        "actions": [
                            {
                                "job": "FillQueue",
                                "type": "updateJob",
                                "action": "stop"
                            },
                            {
                                "job": "Main",
                                "type": "updateJob",
                                "action": "start",
                                "restart": false
                            }
                        ],
                        "expression": "{counter}==5"
                    }
                ]
            }
        }
    }
},
    "queues": [
    "speaking"
],
    "channels": {
    "speech-synthesis-a": {
        "name": null,
            "type": "speech-synthesis"
    }
},
    "controls": [
    {
        "id": "add",
        "up": "0",
        "down": "1",
        "name": "Add",
        "type": "push"
    },
    {
        "id": "timer",
        "up": "false",
        "down": "true",
        "name": "Delay",
        "type": "toggle"
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