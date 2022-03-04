import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Tax.module.css";
import Item from "../../shared/Item/Item";
import ProceedDiv from '../../shared/ProceedDiv/ProceedDiv';
import * as actionTypes from "../../store/actions";

class Tax extends Component {
    render() {
        return (
            <div className={classes.Tax}>
                <p> Select items that were taxed </p>
                <div className={classes.Item}>
                    <p> Items </p>
                    <button onClick={() => this.props.onSelectAll()}>
                        Select all
                    </button>
                </div>
                <div className={classes.Items}>
                {this.props.items.map((item, id) => (
                    <div key={id} className={classes.Item}>
                        <Item
                            itemName={item.name}
                            itemPrice={item.price.toFixed(2)}
                            currentPage={this.props.currentPage}
                            claimers={item.persons}
                        />
                        <input
                            type="checkbox"
                            checked={item.taxed}
                            onChange={() => this.props.onTaxItem(id)}
                        />
                    </div>
                ))}
                </div>
                <ProceedDiv clicked={this.props.onNextPage}>
                    NEXT
                </ProceedDiv>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        persons: state.persons,
        currentPage: state.currentPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTaxItem: (selectedItem) =>
            dispatch({ type: actionTypes.TAX_ITEM, selectedItem: selectedItem }),
        onSelectAll: () => dispatch({ type: actionTypes.SELECT_ALL_ITEMS }),
        onNextPage: () => dispatch({ type: actionTypes.NEXT_PAGE })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tax);
