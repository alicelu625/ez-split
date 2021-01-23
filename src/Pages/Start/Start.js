import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionTypes from '../../store/actions';

class Start extends Component {
    render() {
        return (
            <div>
                <h1>Split a Bill</h1>
                <input type="text" placeholder="Event name" required/>
                <input type="number" placeholder="Amount of people" required/>
                <div onClick={}><p>Submit</p></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        eventName: state.eventName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onReadyToStartHandler: () => dispatch({type: actionTypes.SET_EVENT_NAME})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);