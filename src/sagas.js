import {call, put, take, fork} from "redux-saga/effects";
import {takeLatest, takeEvery} from "redux-saga";
import {createSocketConnection, createSocketChannel} from './saga-socket-helpers';

function* getStartTimerResponse(action) {
    return yield fetch(`http://localhost:9090/timer/start/${action.name}`)
        .then((response) => response.json())
}

function* startTimer(action) {
    try {
        const timerResponse = yield call(
            getStartTimerResponse, action
        );
        yield put({type: "RECEIVE_TIMER_STATUS", data: timerResponse});
    } catch (e) {
        yield put({type: "FAILED_RECEIVING_TIMER_STATUS", data: e.message});
    }
}

function* watchTheSocket() {
    // return socket and stompClient objects, used for subscription and disconnect callbacks in socketChannel
    const {socket, stompClient} = yield call(createSocketConnection);
    const socketChannel = yield call(createSocketChannel, socket, stompClient);

    while (true) {
        const message = yield take(socketChannel);
        console.log('------------------------ Dispatching timer update ------------------------', yield put(message));
    }
}

function* rootSaga() {
    yield [
        takeLatest("START_TIMER", startTimer),
        fork(watchTheSocket)
    ];
}

export default rootSaga;
