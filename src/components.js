import React from "react";

const TimerRow = ({name, state, counter}) => (
    <tr>
        <td>{name}</td>
        <td>{state}</td>
        <td>{counter}</td>
    </tr>
);

const Main = ({onStartTimer, timers}) => (
    <div>
        <h1>Timers</h1>
        <hr />
        <button onClick={(event) => onStartTimer(event, `T${Math.random() * 100}`)}>
            Start timer
        </button>
        <hr />
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Counter</th>
            </tr>
            </thead>
            <tbody>
            {timers.length === 0 && <tr>
                <td colSpan="3">Empty</td>
            </tr>}
            {timers.length > 0 && timers.map((timer) =>
                <TimerRow
                    key={`timerRow-${timer.name}`}
                    name={timer.name}
                    state={timer.state}
                    counter={timer.counter}
                />
            )}
            </tbody>
        </table>
    </div>
);

export default Main;