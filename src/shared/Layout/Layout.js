import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from '../Header/Header';
import ProceedDiv from '../ProceedDiv/ProceedDiv';

class Layout extends Component {
    render() {
        //show Header & ProceedDiv after page 1
        let afterStart = this.props.currentPage > 0
        ? <div>
            <Header eventName={this.props.eventName}/>
            {this.props.children}
            <ProceedDiv/>
        </div>
        : <div>{this.props.children}</div>;

        return afterStart;
        
    }
}

const mapStateToProps = state => {
    return {
        eventName: state.eventName,
        currentPage: state.currentPage
    }
}

export default connect(mapStateToProps)(Layout);