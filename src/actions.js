export function startTimer(name = "Default") {
    return {
        type: "START_TIMER",
        name
    };
}