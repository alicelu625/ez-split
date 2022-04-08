import React, { Component } from "react";
import { connect } from "react-redux";

import classes from './Receipt.module.css';
import * as actionTypes from '../../store/actions'

class Receipt extends Component {
    render() {
        return (
            <div className={classes.Receipt}>
                <div className={classes.ReceiptItems}>
                    <div className={classes.Items}>
                        {this.props.items.map((item, id) =>
                            <div className={classes.Item} key={id}>
                                <span>{item.name}</span>
                                <span>${item.price.toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                    <div className={classes.FeesAndTotals}>
                        <div className={classes.FeeItem}>
                            <span className={classes.FeeName}>Subtotal</span>
                            <span className={classes.Amount}>${this.props.subtotal.toFixed(2)}</span>
                        </div>
                        {this.props.fees.map((fee, id) => (
                            <div className={classes.FeeItem} key={id}>
                                <span className={classes.FeeName}>{fee.name}</span>
                                <span className={classes.Amount}>${parseFloat(fee.amount).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className={classes.GrandTotal}>
                            <span className={classes.GrandTotalText}>Grand Total</span>
                            <span className={classes.Amount}>{this.props.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className={classes.Buttons}>
                <button className={classes.BackToBillButton} onClick={this.props.onGoBack}>Back to my bill</button>
                <button className={classes.CloseButton}>Close</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        subtotal: state.subtotal,
        fees: state.fees,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGoBack: () => dispatch({ type: actionTypes.GO_BACK })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);