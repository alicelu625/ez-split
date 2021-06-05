import React, { Component } from "react";
import { connect } from "react-redux";

import classes from './Receipt.module.css';
import * as actionTypes from '../../store/actions'

class Receipt extends Component {
    render() {
        return(
            <div className={classes.Receipt}>
                <div>
                    {this.props.items.map((item, id) => 
                        <div key={id}>{item.name}: {item.price.toFixed(2)}</div>
                    )}
                </div>
                <div>
                    <div>Subtotal: {this.props.subtotal.toFixed(2)}</div>
                    {this.props.fees.map((fee, id) => (
                        <div key={id}>
                            {fee.name}: {parseFloat(fee.amount).toFixed(2)}
                        </div>
                    ))}
                    <div>Grand Total: {this.props.total.toFixed(2)}</div>
                </div>
                <button onClick={this.props.onGoBack}>Back to my bill</button>
                <button>Close</button>
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