import React, {Component} from "react";
import {connect} from 'react-redux';

import classes from "./AdditionalFees.module.css";
import Item from '../../shared/Item/Item';

import * as actionTypes from '../../store/actions';

// export default connect(mapStateToProps)

class AdditionalFees extends Component {
    render() {
        return(
            <div className={classes.AdditionalFees}>
                <p> Hello world</p> 
                {console.log(this.props.currentPage)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.items,
        persons: state.persons,
        currentPage: state.currentPage
    }
}
export default connect(mapStateToProps)(AdditionalFees);