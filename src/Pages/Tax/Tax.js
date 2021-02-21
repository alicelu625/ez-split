import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Tax.module.css';
import Item from '../../shared/Item/Item';
import * as actionTypes from '../../store/actions';

class Tax extends Component {
    handleChange = (tempBoo) => {
        console.log("pressed checkbox")
    }
    render() {
        return (
            <div className={classes.Tax}>
                <p> Select items that were taxed </p>
                <div className={classes.itemSliver}>
                <div>
                <p> Items </p>
                </div>
                <div>
                <button> Select all </button>
                </div>
                </div>
                {this.props.items.map((item, id) => 
                <div key = {id} className={classes.itemSliver}>
                    <div>
                    <Item
                    itemName={item.name}
                    itemPrice={item.price.toFixed(2)}
                    currentPage={this.props.currentPage}
                    claimers={this.props.items[id].persons}                    
                    />
                        </div>
                        <div>

                    {/* Change radio to checkbox */}
                    <input type ="checkbox" checked={this.props.items[id].taxed} onChange={() => this.props.onTaxItem}/>
                    {console.log(this.props.items[id] + "taxed: " + this.props.items[id].taxed)}
                            </div>

                </div>
                )}


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.items,
        persons: state.persons,
        currentPage: state.currentPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTaxItem: (itemId) => dispatch({type: actionTypes.TAX_ITEM, itemId: itemId})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tax);