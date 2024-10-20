{
    "initialActions": [
    {
        "type": "updateVariable",
        "value": "0",
        "variable": "usersOnline"
    },
    {
        "part": "general",
        "text": "waiting...",
        "type": "updateScript",
        "action": "setText"
    }
],
    "finalActions": [],
    "globalTriggers": [
    {
        "type": "session",
        "event": "userJoined",
        "actions": [
            {
                "part": "general",
                "text": "{trigger-user} is here!!",
                "type": "updateScript",
                "action": "setText"
            },
            {
                "type": "updateVariable",
                "value": "+1",
                "variable": "usersOnline"
            },
            {
                "job": "talk",
                "type": "updateQueue",
                "queue": "talking",
                "action": "add",
                "variables": [
                    {
                        "name": "message",
                        "expression": "{trigger-user} has joined your session queue!"
                    }
                ]
            },
            {
                "code": "welcomeUser(user)",
                "type": "customCode",
                "wait": false,
                "resultVar": "result",
                "variables": [
                    {
                        "name": "user",
                        "value": "trigger-user",
                        "expression": null
                    }
                ],
                "storeResult": false
            }
        ]
    },
    {
        "type": "session",
        "event": "userLeft",
        "actions": [
            {
                "type": "updateVariable",
                "value": "-1",
                "variable": "usersOnline"
            },
            {
                "job": "talk",
                "type": "updateQueue",
                "queue": "talking",
                "action": "add",
                "variables": [
                    {
                        "name": "message",
                        "expression": "{trigger-user} has left your session!"
                    }
                ],
                "requiredExpression": "{usersOnline}>0"
            },
            {
                "job": "talk",
                "type": "updateQueue",
                "queue": "talking",
                "action": "add",
                "variables": [
                    {
                        "name": "message",
                        "expression": "Last user, {trigger-user} has left your session!"
                    }
                ],
                "requiredExpression": "{usersOnline}<=0"
            }
        ]
    },
    {
        "type": "variableChange",
        "actions": [
            {
                "job": "talk",
                "type": "updateQueue",
                "queue": "talking",
                "action": "add",
                "variables": [
                    {
                        "name": "message",
                        "expression": "{trigger-user} has left your session!"
                    }
                ],
                "requiredExpression": "{usersOnline}>0"
            },
            {
                "job": "talk",
                "type": "updateQueue",
                "queue": "talking",
                "action": "add",
                "variables": [
                    {
                        "name": "message",
                        "expression": "Last user,  *test* has left your session!"
                    }
                ],
                "requiredExpression": "{usersOnline}<=0"
            }
        ],
        "variable": "test",
        "requiredExpression": "{test}==1"
    }
],
    "jobs": {
    "talk": {
        "steps": {
            "START": {
                "actions": [
                    {
                        "part": "general",
                        "text": "say {queue-message}",
                        "type": "updateScript",
                        "action": "setText"
                    },
                    {
                        "part": "timer",
                        "type": "updateScript",
                        "seconds": "{delay}",
                        "blockActions": null,
                        "stopOnStepChange": null
                    },
                    {
                        "text": "{queue-message}",
                        "type": "updateComponent",
                        "action": "setText",
                        "channel": "speech-synthesis-a"
                    },
                    {
                        "job": "talk",
                        "type": "updateJob",
                        "action": "stop"
                    }
                ],
                    "triggers": []
            }
        }
    }
},
    "queues": [
    "talking"
],
    "channels": {
    "speech-synthesis-a": {
        "name": null,
            "type": "speech-synthesis"
    }
},
    "controls": [
    {
        "id": "test",
        "up": "0",
        "down": "1",
        "name": "test",
        "type": "push"
    },
    {
        "id": "delay",
        "name": "Delay",
        "type": "input",
        "value": "2",
        "description": "Seconds between TSS messages"
    }
],
    "controlPresets": [],
    "media": {
    "audio": {},
    "voices": {
        "domme": {
            "voice": "Google UK English Female",
                "engine": "local",
                "fallback": null
        }
    },
    "patterns": {}
},
    "customFunctions": "function welcomeUser(user)\n{\n    sendChatMessage(\"Welcome \" + user + \" to this unique interactive selfbondage session!\\n\\nI'm bound and and completely helpless until my timer runs out, battery dies or you let me out.\\n\\nJoin me on my Discord https://tinyurl.com/efhw2zaj where I stream live now! You're able to the perspective by switching the scene here on xtoys.\\n\\nIn the meantime use my body as you wish, make me moan, beg or make me cum by controlling my toys.\")\n}\n\nfunction sendChatMessage(message)\n{\n    callAction({\"type\":\"session\",\"action\":\"sendMessage\",\"text\":message});\n}"
}