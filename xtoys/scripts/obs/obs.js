{
    "initialActions": [
    {
        "job": "Main",
        "type": "updateJob",
        "action": "start"
    }
],
    "finalActions": [],
    "globalTriggers": [],
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
                                "code": "switchingScene()",
                                "type": "customCode",
                                "wait": false,
                                "resultVar": "result",
                                "variables": [],
                                "storeResult": false
                            }
                        ],
                        "variable": "scene"
                    }
                ]
            }
        }
    }
},
    "queues": [],
    "channels": {
    "generic-custom-toy-a": {
        "name": "obs",
            "type": "generic-custom-toy"
    }
},
    "controls": [
    {
        "id": "scene",
        "name": "Scene",
        "type": "select",
        "value": "scene 1",
        "options": [
            "scene 1",
            "scene 2",
            "scene 3",
            "scene 4"
        ]
    }
],
    "controlPresets": [],
    "media": {
    "audio": {},
    "voices": {
        "domme 1": {
            "voice": "Google UK English Female",
                "engine": "local",
                "fallback": null
        }
    },
    "patterns": {}
},
    "customFunctions": "function switchingScene() {\n    scene = getVariable(\"scene\")\n    callAction({\"type\":\"updateScript\",\"part\":\"speak\",\"voice\":\"domme 1\",\"blockActions\":false,\"text\":\"Switching to \" + scene});\n    sendData({type: \"obs\", scene:scene})\n}\n\nfunction sendData(data) {\n    callAction({\"type\":\"updateComponent\",\"channel\":\"generic-custom-toy-a\",\"action\":\"setValue\",\"key\":\"command\",\"value\": data});\n}"
}