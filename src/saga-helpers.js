import { eventChannel } from 'redux-saga';

import SockJs from "sockjs-client";
import Stomp from "stompjs";

function connect() {
    const socket = new SockJs("http://localhost:9090/websocket");
    socket.onopen = function() {
        console.log('open');
        // socketHandler(e.data);
    };
    console.log('connect', socket);
    return socket;
}

function stompCallback(message) {
    console.log('socketCallback!!', message);
    // return message;
}

function createSocketChannel(socket) {
    console.log('Entry to createSocketChannel', socket);
    const stompClient = Stomp.over(socket);
    console.log('stompClient', stompClient);

    stompClient.connect({}, (frame) => {
        console.log('Connected (stompClient) : ' + frame);
        var subscription = stompClient.subscribe('/topic/timers', stompCallback(message)
            //     (message) => {
            //     console.log(message.body);
            // }
        );
        console.log(subscription);
    });

    return eventChannel(emit => {

        const socketHandler = (event) => {
            // puts event payload into the channel
            // this allows a Saga to take this payload from the returned channel
            console.log('socketHandler', event);
            emit(event);
        };

        /*socket.onopen = function(e) {
            console.log('open');
            socketHandler(e.data);
        };*/
        socket.onmessage = function(e) {
            console.log('message', e);
            socketHandler(e);
        };
        socket.onclose = function() {
            console.log('socket.onclose => close');
        };

        // sock.send('test');
        // socket.close();
        const unsubscribe = () => {
            socket.close();
        }

        return unsubscribe;
    })
}

export {connect, createSocketChannel};