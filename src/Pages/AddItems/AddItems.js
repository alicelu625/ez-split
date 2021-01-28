import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './AddItems.module.css';

class AddItems extends Component {
    render() {
        return (
            <div className={classes.AddItems}>
                <div className={classes.Subtotal}>
                    <p>${this.props.subtotal.toFixed(2)}</p>
                    <p>Subtotal</p>
                </div>
                <div>
                    item components
                </div>
                <div>
                    + Add an Item
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        subtotal: state.subtotal
    };
};

export default connect(mapStateToProps)(AddItems);