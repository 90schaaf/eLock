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
    }
],
    "controlPresets": [],
    "media": {
    "patterns": {},
    "audio": {},
    "voices": {}
},
    "customFunctions": ""
}