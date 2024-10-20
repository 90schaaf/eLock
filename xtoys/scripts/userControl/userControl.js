{
    "initialActions": [],
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
                "variable": "onlineUsers"
            },
            {
                "text": "{trigger-user} has joined your session!",
                "type": "updateComponent",
                "action": "setText",
                "channel": "speech-synthesis-a"
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
                "variable": "onlineUsers"
            },
            {
                "text": "{trigger-user} has left your session!",
                "type": "updateComponent",
                "action": "setText",
                "channel": "speech-synthesis-a"
            },
            {
                "text": "Last user has left session!",
                "type": "updateComponent",
                "action": "setText",
                "channel": "speech-synthesis-a",
                "requiredExpression": "{onlineUsers}<=0"
            }
        ]
    },
    {
        "type": "session",
        "event": "chatMessage",
        "actions": [
            {
                "text": "hi",
                "type": "session",
                "action": "sendMessage"
            }
        ]
    }
],
    "jobs": {},
    "queues": [],
    "channels": {
    "speech-synthesis-a": {
        "name": null,
            "type": "speech-synthesis"
    }
},
    "controls": [],
    "controlPresets": [],
    "media": {
    "audio": {},
    "voices": {},
    "patterns": {}
},
    "customFunctions": "function welcomeUser(user)\n{\n    \"Welcome \" + user + \" to this unique interactive selfbondage session! I'm bound and and completely helpless until my timer runs out, battery dies or you let me out.\\nIn the meantime use my body as you wish, make me moan, beg or make me cum by controlling my toys.\\n Join me on my Discord https://tinyurl.com/efhw2zaj where I stream live! You're able to the perspective by switching the scene here on xtoys.  \"\n}"
}