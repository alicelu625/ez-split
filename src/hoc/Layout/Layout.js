import React, { Component } from "react"
import { connect } from "react-redux"

import Header from "../../shared/Header/Header"
import ProceedDiv from "../../shared/ProceedDiv/ProceedDiv"
import * as actionTypes from "../../store/actions"

class Layout extends Component {
    render() {
        //show Header & ProceedDiv after page 1
        // If it isn't the start screen
        let afterStart = (
            <div>
                <Header
                    eventName={this.props.eventName}
                    backClicked={this.props.onGoBack}
                />
                {this.props.children}
                <ProceedDiv clicked={this.props.onNextPage}>Next</ProceedDiv>
            </div>
        );
        if (this.props.currentPage > 3) {
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

        return afterStart;
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
        onGoBack: () => dispatch({ type: actionTypes.GO_BACK }),
        onNextPage: () => dispatch({ type: actionTypes.NEXT_PAGE })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
