import React, {Component} from "react";
import {connect} from 'react-redux';

import classes from "./AdditionalFees.module.css";
import Modal from '../../shared/Modal/Modal';

import * as actionTypes from '../../store/actions';

// export default connect(mapStateToProps)

class AdditionalFees extends Component {
    state = {
        fees: [
            {
                name: 'tax',
                amount: '0.00'
            },
            {
                name: 'tip',
                amount: '0.00'
            }
        ],
        grandTotal: this.props.subtotal,
        showModal: false,
        addFeeName: '',
        addFeeAmount: ''
    }

    //fee amount inline change
    feeChanged = (event, id) => {
        //make copy of fees array
        let fees = [...this.state.fees];
        //make copy of fee object
        let fee = {...fees[id]};
        //update amount
        fee.amount = event.target.value;
        //set object to updated object
        fees[id] = fee;

        //find way to update grandtotal

        //update state to new updated copy
        this.setState({fees});
    }

    //add additional fees clicked
    openModalHandler = () => {
        this.setState({showModal: true});
    }

    //cancel or backdrop clicked
    closeModalHandler = () => {
        this.setState({
            showModal: false,
            addFeeName: '',
            addFeeAmount: ''
        });
    }

    //name change in add fee modal
    addFeeNameChangedHandler = (event) => {
        this.setState({addFeeName: event.target.value});
    }

    //amount change in add fee modal
    addFeeAmountChangedHandler = (event) => {
        this.setState({addFeeAmount: event.target.value});
    }

    //save clicked on modal upon adding fee
    addFeeHandler = () => {
        //new fee object
        let newFee = {
            name: this.state.addFeeName,
            amount: this.state.addFeeAmount
        }

        //find way to update grandtotal

        //add new fee object to array of fees objects
        let updatedFees = [...this.state.fees].concat(newFee);
        //update fees array & reset modal input states
        this.setState({
            fees: updatedFees,
            addFeeName: '',
            addFeeAmount: '',
            showModal: false
        });
    }

    render() {
        return(
            <div className={classes.AdditionalFees}>
                <Modal showModal={this.state.showModal} closeModal={this.closeModalHandler}>
                    <p>Fee Name:
                        <input
                            type="text" 
                            placeholder="Name of fee" 
                            value={this.state.addFeeName}
                            onChange={this.addFeeNameChangedHandler}
                        />
                    </p>
                    <p>$
                        <input 
                            type="text"
                            placeholder="0.00"
                            value={this.state.addFeeAmount}
                            onChange={this.addFeeAmountChangedHandler}
                        />
                    </p>
                    <div>
                        <button onClick={this.closeModalHandler}>Cancel</button>
                        <button onClick={this.addFeeHandler}>Save</button>
                    </div>
                </Modal>
                <div className={classes.Fees}>
                    <div className={classes.Fee}>
                        <p>Subtotal</p>
                        <p>${this.props.subtotal}</p>
                    </div>
                    {this.state.fees.map((fee, id) =>
                        <div className={classes.Fee} key={id}>
                            <p>{fee.name}</p>
                            <p>$<input value={fee.amount} onChange={(event) => this.feeChanged(event, id)}/></p>
                        </div>
                    )}
                    <div>
                        <button onClick={this.openModalHandler}>+ Additional Fees</button>
                    </div>
                </div>
                <div className={classes.Total}>
                    <p>Grandtotal</p>
                    <p>${this.state.grandTotal}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        subtotal: state.subtotal
    }
}
export default connect(mapStateToProps)(AdditionalFees);