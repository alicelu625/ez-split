import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./AddItems.module.css";
import ProceedDiv from '../../shared/ProceedDiv/ProceedDiv';
import Modal from "../../shared/Modal/Modal";
import * as actionTypes from "../../store/actions";
import Item from "../../shared/Item/Item";

class AddItems extends Component {
    state = {
        showModal: false,
        itemName: "",
        itemPrice: "",
        itemNameEmpty: false
    }

    //scroll to bottom of list of items
    scrollToBottom = () => {
        this.itemsRef.scrollIntoView({ behavior: 'smooth' });
    }

    //scroll to bottom of list of items
    componentDidMount () {
        this.scrollToBottom();
    }

    //scroll to bottom of list of items when new item added
    componentDidUpdate () {
        this.scrollToBottom();
    }
    

    //add items clicked
    openModalHandler = () => {
        this.setState({ showModal: true });
    }

    //cancel or backdrop clicked
    closeModalHandler = () => {
        this.setState({ showModal: false });
    }

    //change in item name input
    itemNameChangedHandler = (event) => {
        this.setState({ itemName: event.target.value, itemNameEmpty: false });
    }

    //change in price input
    itemPriceChangedHandler = (event) => {
        let val = event.target.value;

        //no validation needed for empty string
        if (val === "") {
            this.setState({ itemPrice: event.target.value });
            return;
        }

        //note for caret position
        let original_len = val.length;
        let caret_position = event.target.selectionStart;

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

        //set caret to last position
        let new_length = val.length;
        caret_position = new_length - original_len + caret_position;

        //update state & set caret
        this.setState({ itemPrice: val },
            () => {
                this.refs.input.selectionStart = this.refs.input.selectionEnd = caret_position;
            });
    }

    //check input when "Save" is pressed
    checkInput = () => {
        let checkFail = false;

        // check if item name field is empty
        if (this.state.itemName.trim() === "") {
            console.log("empty");
            this.setState({itemNameEmpty: true, itemName: ""});
            checkFail = true;
        }

        // if check did not fail, proceed to save item
        if (checkFail === false) {
            this.saveItemHandler();
        }
    }


    //save item name & price, reset modal
    saveItemHandler = () => {
        this.props.onAddItem(this.state.itemName, this.state.itemPrice);
        this.setState({ showModal: false, itemName: "", itemPrice: "" });
    }

    render() {
        return (
            <div className={classes.AddItems}>
                <Modal
                    showModal={this.state.showModal}
                    closeModal={this.closeModalHandler}
                >
                    <div className={classes.ModalContent}>
                    <input
                        className={classes.InputField}
                        style={{marginLeft:"7px"}}
                        type="text"
                        placeholder="e.g. Coffee"
                        onChange={(event) => this.itemNameChangedHandler(event)}
                        value={this.state.itemName}
                    />
                    {this.state.itemNameEmpty === true ? 
                        <p className={classes.ErrorMessage}>Item name is required.</p>
                        : null
                    }
                    <p>
                        $
                        <input
                            className={classes.InputField}
                            ref="input"
                            type="text"
                            placeholder="0.00"
                            onChange={(event) =>
                                this.itemPriceChangedHandler(event)
                            }
                            value={this.state.itemPrice}
                        />
                    </p>
                    </div>
                    <div className={classes.Buttons}>
                        <button className={classes.AddButton} onClick={this.checkInput}>ADD</button>
                        <button className={classes.CancelButton} onClick={this.closeModalHandler}>CANCEL</button>
                    </div>
                </Modal>
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
                    <div ref={(el) => {this.itemsRef = el;}}></div>
                </div>
                <button
                    className={classes.AddItemButton}
                    onClick={this.openModalHandler}
                >
                    + Add an Item
                </button>
                <div className={classes.Subtotal}>
                    <p className={classes.SubtotalText}>Subtotal</p>
                    <p>${this.props.subtotal.toFixed(2)}</p>
                </div>
                <ProceedDiv clicked={this.props.onNextPage}>
                    Next
                </ProceedDiv>
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
        onNextPage: () => dispatch({ type: actionTypes.NEXT_PAGE })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItems);
