import React, { Component } from "react"
import { connect } from "react-redux"

import Header from "../../shared/Header/Header"
import * as actionTypes from "../../store/actions"

class Layout extends Component {
    render() {
        //show Header & ProceedDiv after page 1
        let afterStart = (
            <div>
                <Header
                    eventName={this.props.eventName}
                    backClicked={this.props.onGoBack}
                />
                {this.props.children}
                
            </div>
        );
        /*
        if (this.props.currentPage > 0) {
            afterStart = (
                <div>
                    <Header
                        eventName={this.props.eventName}
                        backClicked={this.props.onGoBack}
                    />
                    {this.props.children}
                </div>
            );
        } else if (this.props.currentPage === 0) {
            afterStart = <div>{this.props.children}</div>;
        }
        */
        return this.props.currentPage > 0 ? afterStart
            : <div>{this.props.children}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        eventName: state.eventName,
        currentPage: state.currentPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGoBack: () => dispatch({ type: actionTypes.GO_BACK })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
