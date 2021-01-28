import React, {Component} from 'react';
import {connect} from 'react-redux';

class Header extends Component {
    render() {
        return (
            <p>{this.props.eventName}</p>
        );
    }
}

const mapStateToProps = state => {
    return {
        eventName: state.eventName
    }
}

export default connect(mapStateToProps)(Header);