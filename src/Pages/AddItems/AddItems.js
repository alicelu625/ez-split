import React, { Component } from "react"
import { connect } from "react-redux"

import classes from "./AddItems.module.css"
import Modal from "../../shared/Modal/Modal"
import * as actionTypes from "../../store/actions"
import Item from "../../shared/Item/Item"

class AddItems extends Component {
    state = {
        showModal: false,
        itemName: "",
        itemPrice: "",
    }

    //add items clicked
    openModalHandler = () => {
        this.setState({ showModal: true })
    }

    //cancel or backdrop clicked
    closeModalHandler = () => {
        this.setState({ showModal: false })
    }

    //change in item name input
    itemNameChangedHandler = (event) => {
        this.setState({ itemName: event.target.value })
    }

    //change in price input
    itemPriceChangedHandler = (event) => {
        let val = event.target.value;

        //no validation needed for empty string
        if (val === "") {
            this.setState({ itemPrice: event.target.value });
            return;
        }

        //if decimal entered
        if (val.indexOf(".") >= 0) {
            //position of decimal
            let dec_position = val.indexOf(".");

            //split # by decimal 
            let left = val.substring(0, dec_position);
            let right = val.substring(dec_position);

            //validate numbers
            left = left.replace(/\D/g, "");
            right = right.replace(/\D/g, "");

            //limit right side to only 2 digits
            right = right.substring(0,2);

            //join number
            val = left + "." + right;
        }
        //if no decimal entered
        else {
            //add commas to # & remove all non-digits
            val = val.replace(/\D/g, "");
        }
        this.setState({ itemPrice: val });
    }

    //save clicked after entering name & price
    saveItemHandler = () => {
        this.props.onAddItem(this.state.itemName, this.state.itemPrice)
        this.setState({ showModal: false, itemName: "", itemPrice: "" })
    }

    render() {
        return (
            <div className={classes.AddItems}>
                <Modal
                    showModal={this.state.showModal}
                    closeModal={this.closeModalHandler}
                >
                    <input
                        type="text"
                        placeholder="Item name"
                        onChange={(event) => this.itemNameChangedHandler(event)}
                        value={this.state.itemName}
                    />
                    <p>
                        $
                        <input
                            type="text"
                            placeholder="0.00"
                            onChange={(event) =>
                                this.itemPriceChangedHandler(event)
                            }
                            value={this.state.itemPrice}
                        />
                    </p>
                    <div>
                        <button onClick={this.closeModalHandler}>Cancel</button>
                        <button onClick={this.saveItemHandler}>Save</button>
                    </div>
                </Modal>
                <div className={classes.Subtotal}>
                    <p>${this.props.subtotal.toFixed(2)}</p>
                    <p>Subtotal</p>
                </div>
                <div className={classes.Items}>
                    {this.props.items.map((item, id) => (
                        <div className={classes.ItemRow} key={id}>
                            <Item
                                itemName={item.name}
                                itemPrice={item.price.toFixed(2)}
                                currentPage={this.props.currentPage}
                                claimers={this.props.items[id].claimers}
                            />
                            <button
                                className={classes.RemoveItemButton}
                                onClick={() => this.props.onRemoveItem(id)}
                            >
                                -
                            </button>
                        </div>
                    ))}
                </div>
                <div
                    className={classes.AddItemButton}
                    onClick={this.openModalHandler}
                >
                    + Add an Item
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        subtotal: state.subtotal,
        items: state.items,
        currentPage: state.currentPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddItem: (name, price) =>
            dispatch({ type: actionTypes.ADD_ITEM, name: name, price: price }),
        onRemoveItem: (id) =>
            dispatch({ type: actionTypes.REMOVE_ITEM, id: id }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItems)
