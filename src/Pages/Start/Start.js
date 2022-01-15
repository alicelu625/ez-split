import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProceedDiv from '../../shared/ProceedDiv/ProceedDiv';

import * as actionTypes from '../../store/actions';
import classes from './Start.module.css';

class Start extends Component {
    state = {
        eventName: "",
        amountPeople: ""
    }

    nameChangedHandler = (event) => {
        this.setState({eventName: event.target.value});
    }

    amountPeopleChangedHandler = (event) => {
        this.setState({amountPeople: event.target.value});
    }

    render() {
        return (
            <div className={classes.Start}>
                <h1>Split a Bill</h1>
                <input 
                    className={classes.Input}
                    type="text" 
                    placeholder="Event name" 
                    required
                    onChange={(event) => this.nameChangedHandler(event)}
                    value={this.state.eventName}
                />
                <input 
                    className={classes.Input}
                    type="number"
                    placeholder="Amount of people"
                    required
                    onChange={(event) => this.amountPeopleChangedHandler(event)}
                    value={this.state.amountPeople}
                />
                <ProceedDiv className={classes.ProceedDiv} clicked={() => this.props.onStart(this.state.eventName, this.state.amountPeople)}>
                    Start
                </ProceedDiv>
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
        onStart: (eventName, amountPeople) => dispatch({type: actionTypes.ON_START, eventName: eventName, amountPeople: amountPeople})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);