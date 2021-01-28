import React, {Component} from 'react';
import {connect} from 'react-redux';

class Header extends Component {
    render() {
        return (
            <div>
                <p>{this.props.eventName}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        eventName: state.eventName
    }
}

export default connect(mapStateToProps)(Header);