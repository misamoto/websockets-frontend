import {connect} from "react-redux";
import {startTimer} from "./actions";
import MainComponent from "./components";

const mapStateToProps = (state) => {
    return {
        timers: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStartTimer: (event, name) => dispatch(startTimer(name))
    }
};

export const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainComponent);