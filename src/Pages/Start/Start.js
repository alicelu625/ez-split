import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProceedDiv from '../../shared/ProceedDiv/ProceedDiv';

import * as actionTypes from '../../store/actions';
import classes from './Start.module.css';

class Start extends Component {
    state = {
        eventName: "",
        amountPeople: "",
        eventNameEmpty: false,
        amountPeopleEmpty: false
    }

    nameChangedHandler = (event) => {
        this.setState({eventName: event.target.value});
    }

    amountPeopleChangedHandler = (event) => {
        this.setState({amountPeople: event.target.value});
    }

    // Check inputs when "Start" is pressed
    checkInput = () => {
        // check if event name field is empty
        if (this.state.eventName === "") {
            this.setState({eventNameEmpty: true});
        }
        // check if amount of people field is empty
        if (this.state.amountPeople === "") {
            this.setState({amountPeopleEmpty: true});
        }

        if (this.state.eventNameEmpty === false && this.state.amountPeopleEmpty === false) {
            this.props.onStart(this.state.eventName, this.state.amountPeople);
        }
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
                <p></p>
                <input 
                    className={classes.Input}
                    type="number"
                    placeholder="Amount of people"
                    required
                    onChange={(event) => this.amountPeopleChangedHandler(event)}
                    value={this.state.amountPeople}
                />
                <ProceedDiv className={classes.ProceedDiv} clicked={this.checkInput}>
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