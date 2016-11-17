import { eventChannel } from 'redux-saga';

import SockJs from "sockjs-client";
import Stomp from "stompjs";

function createSocketConnection() {
    const socket = new SockJs("http://localhost:9090/websocket");
    const stompClient = Stomp.over(socket);
    console.log('createSocketConnection client:', stompClient);
    console.log('createSocketConnection socket:', socket);
    return {socket, stompClient};
}

function createSocketChannel(socket, stompClient) {
    // returns eventChannel that'll push out(emit) messages from stmopJS client
    return eventChannel(emit => {

        const socketHandler = (event) => {
            // puts event payload into the channel
            // this allows a Saga to take this payload from the returned channel
            emit(event);
        };

        // stompClient's subscribe method uses socketHandler as callback to emit received push messages
        stompClient.connect({}, (frame) => {
            console.log('Connected callback: ' + frame);
            const subscription = stompClient.subscribe('/topic/timers', (message) => {
                socketHandler({type: 'RECEIVED_TIMER_UPDATE', payload: message.body});
            });
        });

        socket.onclose = function() {
            console.log('socket.onclose => close');
        };

        const unsubscribe = () => {
            stompClient.disconnect();
            socket.close();
        }

        return unsubscribe;
    })
}

export {createSocketConnection, createSocketChannel};