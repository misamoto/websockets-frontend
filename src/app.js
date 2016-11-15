import React from "react";
import {render} from "react-dom";
import {applyMiddleware, createStore, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import {Provider} from "react-redux";
import reducer from "./reducers";
import rootSaga from "./sagas";
import {MainContainer} from "./containers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <MainContainer/>
    </Provider>
    , document.getElementById("app")
);