// Define probabilities for A, B, and C in percentage
probA = 33;
probB = 33;
probC = 33;

// Function to simulate which event happens based on the probabilities
function run() {
    random = Math.random() * 100; // Generate a random number between 0 and 100

    nextJob = ""

    if (random < probA) {
        nextJob = "tease"
    } else if (random < probA + probB) {
        nextJob = "pleasure"
    } else {
        nextJob = "pain"
    }

    callAction({"type":"updateJob","job":nextJob,"action":"start","restart":true});
}

function next() {
    callAction({"type":"updateJob","job":"activate_domme","action":"start","restart":true});
}