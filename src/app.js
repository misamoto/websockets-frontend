import React from "react";
import {render} from "react-dom";
import {applyMiddleware, createStore, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import {Provider} from "react-redux";
import reducer from "./reducers";
import startTimerSaga from "./sagas";
import {MainContainer} from "./containers";

import SockJs from "sockjs-client";
import Stomp from "stompjs";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(startTimerSaga);

function connect() {
    const socket = new SockJs("http://localhost:9090/websocket");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/timers', (message) => {
            console.log(message.body);
        });
    });
}

connect();

render(
    <Provider store={store}>
        <MainContainer/>
    </Provider>
    , document.getElementById("app")
);