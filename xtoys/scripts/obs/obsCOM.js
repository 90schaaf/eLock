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
        "key": "chat",
        "type": "componentState",
        "event": "any",
        "actions": [
            {
                "text": "{trigger}",
                "type": "session",
                "action": "sendMessage"
            },
            {
                "text": "{trigger}",
                "type": "updateComponent",
                "action": "setText",
                "channel": "speech-synthesis-a"
            }
        ],
        "channel": "generic-custom-toy-a"
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
    "speech-synthesis-a": {
        "name": null,
            "type": "speech-synthesis"
    },
    "generic-custom-toy-a": {
        "name": "obs",
            "type": "generic-custom-toy"
    }
},
    "controls": [],
    "controlPresets": [],
    "media": {
    "audio": {},
    "voices": {},
    "patterns": {}
},
    "customFunctions": ""
}