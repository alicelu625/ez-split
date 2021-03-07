import React, {Component} from "react";
import {connect} from 'react-redux';

import classes from "./AdditionalFees.module.css";
import Modal from '../../shared/Modal/Modal';

import * as actionTypes from '../../store/actions';

// export default connect(mapStateToProps)

class AdditionalFees extends Component {
    state = {
        tax: 0.00,
        tip: 0.00,
        grandTotal: this.props.subtotal,
        showModal: false,
        addedFee: ''
    }

    taxChanged = (event) => {
        //problem: type conversions
        //problem: grandtotal is changing permanently
        console.log(typeof(this.state.grandTotal));
        console.log(parseFloat(event.target.value));
        let newTotal = this.state.grandTotal + parseFloat(event.target.value);
        this.setState({
            tax: event.target.value,
            grandTotal: newTotal
        });
    }

    tipChanged = (event) => {
        this.setState({tip: event.target.value});
    }

    //add additional fees clicked
    openModalHandler = () => {
        this.setState({showModal: true});
    }

    //cancel or backdrop clicked
    closeModalHandler = () => {
        this.setState({showModal: false});
    }

    //change in price input
    addedFeeChangedHandler = (event) => {
        this.setState({addedFee: event.target.value});
    }

    render() {
        return(
            <div className={classes.AdditionalFees}>
                <Modal showModal={this.state.showModal} closeModal={this.closeModalHandler}>
                    <p>Fee Name: <input type="text" placeholder="Name of fee"/></p>
                    <p>$
                        <input 
                            type="text"
                            placeholder="0.00"
                            onChange={this.addedFeeChangedHandler}
                            value={this.state.addedFee}
                        />
                    </p>
                    <div>
                        <button onClick={this.closeModalHandler}>Cancel</button>
                        <button onClick={this.saveItemHandler}>Save</button>
                    </div>
                </Modal>
                <div className={classes.Fees}>
                    <div className={classes.Fee}>
                        <p>Subtotal</p>
                        <p>${this.props.subtotal}</p>
                    </div>
                    <div className={classes.Fee}>
                        <p>Tax</p>
                        <p>$<input value={this.state.tax} onChange={this.taxChanged}/></p>
                    </div>
                    <div className={classes.Fee}>
                        <p>Tip</p>
                        <p>$<input value={this.state.tip} onChange={this.tipChanged}/></p>
                    </div>
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