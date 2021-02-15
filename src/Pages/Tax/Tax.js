import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Tax.module.css';

class Tax extends Component {
    render() {
        return (
            <div className={classes.Tax}>
                Hi
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.items
    }
}

export default connect(mapStateToProps)(Tax);