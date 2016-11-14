import {call, put, take} from "redux-saga/effects";
import {takeLatest} from "redux-saga";

function* getStartTimerResponse(action) {
    return yield fetch(`http://localhost:9090/timer/start/${action.name}`)
        .then((response) => response.json())
}

function* startTimer(action) {
    try {
        const timerResponse = yield call(
            getStartTimerResponse, action
        );
        yield put({type: "RECEIVE_TIMER_STATUS", data: timerResponse})
    } catch (e) {
        yield put({type: "FAILED_RECEIVING_TIMER_STATUS", data: e.message})
    }
}

function* startTimerSaga() {
    yield* takeLatest("START_TIMER", startTimer);
}

export default startTimerSaga;