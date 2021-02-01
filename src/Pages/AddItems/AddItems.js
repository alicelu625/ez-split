import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './AddItems.module.css';
import Modal from '../../shared/Modal/Modal';
import * as actionTypes from '../../store/actions';
import Item from './Item/Item';

class AddItems extends Component {
    state = {
        showModal: false,
        itemName: '',
        itemPrice: ''
    }

    openModalHandler = () => {
        this.setState({showModal: true});
    }

    closeModalHandler = () => {
        this.setState({showModal: false});
    }

    itemNameChangedHandler = (event) => {
        this.setState({itemName: event.target.value});
    }

    itemPriceChangedHandler = (event) => {
        this.setState({itemPrice: event.target.value});
    }

    saveItemHandler = () => {
        this.props.onAddItem(this.state.itemName, this.state.itemPrice);
        this.setState({showModal: false, itemName: '', itemPrice: ''});
    }

    render() {
        return (
            <div className={classes.AddItems}>
                <Modal showModal={this.state.showModal} closeModal={this.closeModalHandler}>
                    <input 
                        type="text" 
                        placeholder="Item name" 
                        onChange={(event) => this.itemNameChangedHandler(event)}
                        value={this.state.itemName}
                    />
                    <p>$ 
                        <input 
                            type="text" 
                            placeholder="0.00"
                            onChange={(event) => this.itemPriceChangedHandler(event)}
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
                    {this.props.items.map((item, id) => 
                        <div className={classes.ItemRow} key={id}>
                            <Item
                                itemName={item.name}
                                itemPrice={item.price}
                            />
                            <button
                                className={classes.RemoveItemButton}
                                onClick={() => this.props.onRemoveItem(id)}
                            >-</button>
                        </div>
                    )}
                </div>
                <div className={classes.AddItemButton} onClick={this.openModalHandler}>
                    + Add an Item
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        subtotal: state.subtotal,
        items: state.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (name, price) => dispatch({type: actionTypes.ADD_ITEM, name: name, price: price}),
        onRemoveItem: (id) => dispatch({type: actionTypes.REMOVE_ITEM, id: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItems);