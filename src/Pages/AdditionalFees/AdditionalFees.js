import React, { Component } from "react"
import { connect } from "react-redux"

import classes from "./AdditionalFees.module.css"
import Modal from "../../shared/Modal/Modal"
import ProceedDiv from "../../shared/ProceedDiv/ProceedDiv"
import * as actionTypes from "../../store/actions"

class AdditionalFees extends Component {
    state = {
        fees: [
            {
                name: "Tax",
                amount: "0.00",
            },
            {
                name: "Tip",
                amount: "0.00",
            },
        ],
        grandTotal: this.props.subtotal,
        showModal: false,
        addFeeName: "",
        addFeeAmount: ""
    }

    //fee amount inline change
    feeChanged = (event, id) => {
        //make copy of fees array
        let fees = [...this.state.fees];
        //make copy of fee object
        let fee = { ...fees[id] };

        //validate input
        let val = event.target.value;

        //no validation needed for empty string
        if (val === "") {
            //update amount
            fee.amount = event.target.value;
            //set object to updated object
            fees[id] = fee;

            //update state to new updated copy
            this.setState({ fees });
            return;
        }

        //note for caret position
        let original_len = val.length;
        let caret_position = event.target.selectionStart;

        //if decimal entered
        if (val.indexOf(".") >= 0) {
            //position of decimal
            let dec_position = val.indexOf(".");

            //split # by decimal 
            let left = val.substring(0, dec_position);
            let right = val.substring(dec_position);

            //validate numbers
            left = left.replace(/\D/g, "");
            if (left.length > 1) {
                left = left.replace(/\b0+/g, '');
            }
            right = right.replace(/\D/g, "");

            //limit right side to only 2 digits
            right = right.substring(0, 2);

            //join number
            val = left + "." + right;
        }
        //if no decimal entered
        else {
            //add commas to # & remove all non-digits
            val = val.replace(/\D/g, "").replace(/\b0+/g, '');
        }

        //update amount
        fee.amount = val;
        //set object to updated object
        fees[id] = fee;

        //set caret to last position
        let new_length = val.length;
        caret_position = new_length - original_len + caret_position;

        //update state to new updated copy & set caret
        this.setState({ fees },
            () => {
                this.refs.input1.selectionStart = this.refs.input1.selectionEnd = caret_position;
            });
    }

    //when user leaves input field
    updateTotal = (event, id) => {
        let newTotal = this.state.grandTotal;

        //make copy of fees array
        let fees = [...this.state.fees];
        //make copy of fee object
        let fee = { ...fees[id] };

        //default input amount as $0
        let inputAmount = 0;

        //if input is not empty or value is not 0, set inputAmount as the input value
        if (event.target.value !== "" && parseFloat(event.target.value) > 0) {
            inputAmount = parseFloat(event.target.value);
        }

        //get updated grandtotal
        //start with subtotal
        newTotal = this.props.subtotal;
        //go through each fee amounts
        for (let i = 0; i < this.state.fees.length; i++) {
            //if not selected fee, add to new total
            if (i !== id) {
                newTotal = newTotal + parseFloat(this.state.fees[i].amount);
            }
        }
        //add current fee
        newTotal = newTotal + inputAmount;
        //update amount & update fee to 2 decimal places string
        fee.amount = inputAmount.toFixed(2);

        //set object to updated object
        fees[id] = fee;

        //update state with new total & fees
        this.setState({ grandTotal: newTotal, fees: fees });
    }

    //add additional fees clicked
    openModalHandler = () => {
        this.setState({ showModal: true });
    }

    //cancel or backdrop clicked
    closeModalHandler = () => {
        this.setState({
            showModal: false,
            addFeeName: 0,
            addFeeAmount: 0,
        });
    }

    //name change in add fee modal
    addFeeNameChangedHandler = (event) => {
        this.setState({ addFeeName: event.target.value });
    }

    //amount change in add fee modal
    addFeeAmountChangedHandler = (event) => {
        let val = event.target.value;

        //no validation needed for empty string
        if (val === "") {
            this.setState({ addFeeAmount: event.target.value });
            return;
        }

        //note for caret position
        let original_len = val.length;
        let caret_position = event.target.selectionStart;

        //if decimal entered
        if (val.indexOf(".") >= 0) {
            //position of decimal
            let dec_position = val.indexOf(".");

            //split # by decimal 
            let left = val.substring(0, dec_position);
            let right = val.substring(dec_position);

            //validate numbers
            left = left.replace(/\D/g, "");
            right = right.replace(/\D/g, "");

            //limit right side to only 2 digits
            right = right.substring(0, 2);

            //join number
            val = left + "." + right;
        }
        //if no decimal entered
        else {
            //add commas to # & remove all non-digits
            val = val.replace(/\D/g, "");
        }

        //set caret to last position
        let new_length = val.length;
        caret_position = new_length - original_len + caret_position;

        //update state & set caret
        this.setState({ addFeeAmount: val },
            () => {
                this.refs.input2.selectionStart = this.refs.input2.selectionEnd = caret_position;
            });
    }

    //save clicked on modal upon adding fee
    addFeeHandler = () => {
        //new fee object
        let newFee = {
            name: this.state.addFeeName,
            amount: parseFloat(this.state.addFeeAmount).toFixed(2)
        };

        //update grand total
        let newTotal = this.state.grandTotal;
        //start with subtotal
        newTotal = this.props.subtotal;
        //go through each fee amounts, add to new total
        for (let i = 0; i < this.state.fees.length; i++) {
            newTotal = newTotal + parseFloat(this.state.fees[i].amount);
        }
        //add new fee amount
        newTotal = newTotal + parseFloat(this.state.addFeeAmount);

        //add new fee object to array of fees objects
        let updatedFees = [...this.state.fees].concat(newFee);
        //update fees array & reset modal input states
        this.setState({
            fees: updatedFees,
            addFeeName: "",
            addFeeAmount: "",
            grandTotal: newTotal,
            showModal: false,
        });
    }

    render() {
        return (
            <div className={classes.AdditionalFees}>
                <Modal
                    showModal={this.state.showModal}
                    closeModal={this.closeModalHandler}
                >
                    <div className={classes.ModalContent}>
                        <input
                            className={classes.ModalInputField}
                            style={{marginLeft:"7px"}}
                            ref="input2"
                            type="text"
                            placeholder="e.g. Service Fee"
                            value={this.state.addFeeName}
                            onChange={this.addFeeNameChangedHandler}
                        />
                        <p>
                            $
                            <input
                                className={classes.ModalInputField}
                                type="text"
                                placeholder="0.00"
                                value={this.state.addFeeAmount}
                                onChange={this.addFeeAmountChangedHandler}
                            />
                        </p>
                        <div className={classes.Buttons}>
                            <button className={classes.SaveButton} onClick={this.addFeeHandler}>Save</button>
                            <button className={classes.CancelButton} onClick={this.closeModalHandler}>Cancel</button>
                        </div>
                    </div>
                </Modal>
                <div className={classes.Fees}>
                    <div className={classes.Fee}>
                        <p className={classes.FeeName}>Subtotal</p>
                        <p className={classes.FixedAmount}>${this.props.subtotal.toFixed(2)}</p>
                    </div>
                    {this.state.fees.map((fee, id) => (
                        <div className={classes.Fee} key={id}>
                            <p className={classes.FeeName}>{fee.name}</p>
                            <p>
                                $
                                <input
                                    className={classes.InputField}
                                    ref="input1"
                                    type="text"
                                    value={fee.amount}
                                    onBlur={(event) =>
                                        this.updateTotal(event, id)
                                    }
                                    onChange={(event) =>
                                        this.feeChanged(event, id)
                                    }
                                />
                            </p>
                        </div>
                    ))}
                </div>
                <button className={classes.AddFeeButton} onClick={this.openModalHandler}>
                    + Additional fees
                </button>
                <div className={classes.Total}>
                    <p className={classes.FeeName}>Grandtotal</p>
                    <p className={classes.FixedAmount}>${this.state.grandTotal.toFixed(2)}</p>
                </div>
                <ProceedDiv
                    clicked={() =>
                        this.props.onSplit(
                            this.state.fees,
                            this.state.grandTotal
                        )
                    }
                >
                    Split
                </ProceedDiv>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        subtotal: state.subtotal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSplit: (fees, grandTotal) =>
            dispatch({
                type: actionTypes.ON_SPLIT,
                fees: fees,
                grandTotal: grandTotal,
            }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalFees);
