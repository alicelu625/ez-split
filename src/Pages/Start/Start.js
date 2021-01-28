import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionTypes from '../../store/actions';

class Start extends Component {
    render() {
        return (
            <div>
                <h1>Split a Bill</h1>
                <input 
                    type="text" 
                    placeholder="Event name" 
                    required
                    onChange={(event) => this.props.onEventNameChanged(event)}
                    value={this.props.eventName}
                />
                <input 
                    type="number"
                    placeholder="Amount of people"
                    required
                    onChange={(event) => this.props.onAmountPeopleChanged(event)}
                    value={this.props.amountPeople}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        eventName: state.eventName,
        amountPeople: state.amountPeople
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onReadyToStart: () => dispatch({type: actionTypes.SET_EVENT_NAME}),
        onEventNameChanged: (event) => dispatch({type: actionTypes.EVENT_NAME_CHANGED, event: event}),
        onAmountPeopleChanged: (event) => dispatch({type: actionTypes.AMOUNT_PEOPLE_CHANGED, event: event})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);