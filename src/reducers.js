const dummyTimers = [{name: "Test", state: "IN_PROGRESS", counter: 50}];

export default function (timers = dummyTimers, action) {
    switch (action.type) {
        case "RECEIVE_TIMER_STATUS":
            return [...timers, action.data];
        default:
            return timers;
    }
}
