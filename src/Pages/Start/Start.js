import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProceedDiv from '../../shared/ProceedDiv/ProceedDiv';

import * as actionTypes from '../../store/actions';
import classes from './Start.module.css';
import startIcon from '../../assets/start-icon.png';

class Start extends Component {
    state = {
        eventName: "",
        amountPeople: "",
        eventNameEmpty: false,
        amountPeopleEmpty: false
    }

    // Input handlers
    nameChangedHandler = (event) => {
        this.setState({ eventName: event.target.value, eventNameEmpty: false });
    }

    amountPeopleChangedHandler = (event) => {
        this.setState({ amountPeople: event.target.value, amountPeopleEmpty: false });
    }

    // Check inputs when "Start" is pressed
    checkInput = () => {
        let checkFail = false;

        // check if event name field is empty
        if (this.state.eventName.trim() === "") {
            this.setState({ eventNameEmpty: true, eventName: "" });
            checkFail = true;
        }
        // check if amount of people field is empty
        if (this.state.amountPeople === "") {
            this.setState({ amountPeopleEmpty: true });
            checkFail = true;
        }

        // if check did not fail, proceed to next step
        if (checkFail === false) {
            this.props.onStart(this.state.eventName, this.state.amountPeople);
        }
    }

    render() {
        return (
            <div className={classes.Start}>
                <p className={classes.Brand}>ezSplit</p>
                <div className={classes.Intro}>
                    <img className={classes.Icon} src={startIcon}/>
                    <h1 style={{marginTop:'0px'}}>Split a Bill</h1>
                    <h2 style={{fontSize:'16px'}}>Taxes, tips, we got you covered</h2>
                </div>
                <div className={classes.InputFields}>
                    <p className={classes.InputLabel}>Event name</p>
                    <input
                        className={classes.Input}
                        type="text"
                        placeholder="e.g Brunch"
                        required
                        onChange={(event) => this.nameChangedHandler(event)}
                        value={this.state.eventName}
                    />
                    {this.state.eventNameEmpty === true ?
                        <p className={classes.ErrorMessage}>Event name is required.</p>
                        : <p className={classes.ErrorMessage}>&nbsp;</p>
                    }
                    <p className={classes.InputLabel}>Amount of people</p>
                    <input
                        className={classes.Input}
                        type="number"
                        placeholder="e.g 3"
                        required
                        onChange={(event) => this.amountPeopleChangedHandler(event)}
                        value={this.state.amountPeople}
                    />
                    {this.state.amountPeopleEmpty === true ?
                        <p className={classes.ErrorMessage}>Amount of people is required.</p>
                        : null
                    }
                </div>
                <ProceedDiv clicked={this.checkInput}>
                    Let's start
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
        onStart: (eventName, amountPeople) => dispatch({ type: actionTypes.ON_START, eventName: eventName, amountPeople: amountPeople })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);