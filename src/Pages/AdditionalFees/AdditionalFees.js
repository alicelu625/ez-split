import React, { Component } from "react"
import { connect } from "react-redux"

import classes from "./AdditionalFees.module.css"
import Modal from "../../shared/Modal/Modal"
import ProceedDiv from "../../shared/ProceedDiv/ProceedDiv"
import * as actionTypes from "../../store/actions"

// export default connect(mapStateToProps)

class AdditionalFees extends Component {
    state = {
        fees: [
            {
                name: "tax",
                amount: "0.00",
            },
            {
                name: "tip",
                amount: "0.00",
            },
        ],
        grandTotal: this.props.subtotal,
        showModal: false,
        addFeeName: "",
        addFeeAmount: "",
    }

    //fee amount inline change
    feeChanged = (event, id) => {
        //make copy of fees array
        let fees = [...this.state.fees]
        //make copy of fee object
        let fee = { ...fees[id] }
        //update amount
        fee.amount = event.target.value
        //set object to updated object
        fees[id] = fee

        //update state to new updated copy
        this.setState({ fees })
    }

    //when user leaves input field
    updateTotal = (event, id) => {
        let newTotal = this.state.grandTotal

        //if input is not empty or value is not 0, get updated grandtotal
        if (event.target.value !== "" && parseFloat(event.target.value) > 0) {
            //start with subtotal
            newTotal = this.props.subtotal
            //go through each fee amounts
            for (let i = 0; i < this.state.fees.length; i++) {
                //if not selected fee, add to new total
                if (i !== id) {
                    newTotal = newTotal + parseFloat(this.state.fees[i].amount)
                }
            }
            //add current fee
            newTotal = parseFloat(newTotal) + parseFloat(event.target.value)
        }

        //update state with new total
        this.setState({ grandTotal: newTotal.toFixed(2) })
    }

    //add additional fees clicked
    openModalHandler = () => {
        this.setState({ showModal: true })
    }

    //cancel or backdrop clicked
    closeModalHandler = () => {
        this.setState({
            showModal: false,
            addFeeName: "",
            addFeeAmount: "",
        })
    }

    //name change in add fee modal
    addFeeNameChangedHandler = (event) => {
        this.setState({ addFeeName: event.target.value })
    }

    //amount change in add fee modal
    addFeeAmountChangedHandler = (event) => {
        this.setState({ addFeeAmount: event.target.value })
    }

    //save clicked on modal upon adding fee
    addFeeHandler = () => {
        //new fee object
        let newFee = {
            name: this.state.addFeeName,
            amount: this.state.addFeeAmount,
        }

        //update grand total
        let newTotal = this.state.grandTotal
        //start with subtotal
        newTotal = parseFloat(this.props.subtotal);
        //go through each fee amounts, add to new total
        for (let i = 0; i < this.state.fees.length; i++) {
            newTotal = newTotal + parseFloat(this.state.fees[i].amount)
        }
        //add new fee amount
        newTotal = newTotal + parseFloat(this.state.addFeeAmount)

        //add new fee object to array of fees objects
        let updatedFees = [...this.state.fees].concat(newFee)
        //update fees array & reset modal input states
        this.setState({
            fees: updatedFees,
            addFeeName: "",
            addFeeAmount: "",
            grandTotal: newTotal.toFixed(2),
            showModal: false,
        })
    }

    render() {
        return (
            <div className={classes.AdditionalFees}>
                <Modal
                    showModal={this.state.showModal}
                    closeModal={this.closeModalHandler}
                >
                    <p>
                        Fee Name:
                        <input
                            type="text"
                            placeholder="Name of fee"
                            value={this.state.addFeeName}
                            onChange={this.addFeeNameChangedHandler}
                        />
                    </p>
                    <p>
                        $
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
                    {this.state.fees.map((fee, id) => (
                        <div className={classes.Fee} key={id}>
                            <p>{fee.name}</p>
                            <p>
                                $
                                <input
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
                    <div>
                        <button onClick={this.openModalHandler}>
                            + Additional Fees
                        </button>
                    </div>
                </div>
                <div className={classes.Total}>
                    <p>Grandtotal</p>
                    <p>${this.state.grandTotal}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalFees)
