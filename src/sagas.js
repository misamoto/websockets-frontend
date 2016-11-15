import {call, put, take, fork} from "redux-saga/effects";
import {takeLatest} from "redux-saga";
import {connect, createSocketChannel} from './saga-helpers';

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

function* watchTheSocket() {
    console.log('Entry to watchTheSocket');

    const socket = yield call(connect);
    console.log('After connect fn', createSocketChannel, socket);
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
        const payload = yield take(socketChannel)
        yield put({type: 'RECEIVED_TIMER_UPDATE', payload})
        // yield fork(pong, stompClient)
    }
}

function* rootSaga() {
    yield [
        takeLatest("START_TIMER", startTimer),
        fork(watchTheSocket)
    ];
}

export default rootSaga;




/*function* handleSocketConsumption() {
 while (true) {
 const socket = yield call(connect);
 // socket.emit('login', { username: payload.username });

 const task = yield fork(handleIO, socket);

 // let action = yield take(`${logout}`);
 yield cancel(task);
 // socket.emit('logout');
 }
 }*/