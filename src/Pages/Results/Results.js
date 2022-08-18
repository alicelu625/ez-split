import React, { Component } from "react";
import { connect } from "react-redux";

import classes from './Results.module.css';
import * as actionTypes from '../../store/actions'

class Results extends Component {
    state = {
        showDetails: new Array(this.props.persons.length).fill(false)
    }

    showDetailsHandler = (id) => {
        //make copy of showDetails array
        let tempArr = [...this.state.showDetails];
        //change index to true
        tempArr[id] = !tempArr[id];
        //set state
        this.setState({ showDetails: tempArr });
    }

    render() {
        return (
            <div className={classes.Results}>
                <h2 className={classes.Header}>Your Split Bill</h2>
                <div className={classes.ResultItems}>
                    <div className={classes.PersonsItems}>
                        {this.props.persons.map((person, id) => (
                            <div className={classes.PersonsRows} key={id}>
                                <div className={classes.PersonRow}>
                                    <div className={classes.PersonNameShowDetails}>
                                        <div className={classes.Person}>
                                            {person.name.includes("Person") === true ?
                                                person.name.replace(/\D/g, "")
                                                : person.name.charAt(0)
                                            }
                                        </div>
                                        <div className={classes.NameShowDetails}>
                                            <p className={classes.PersonName}>{person.name}</p>
                                            <button className={classes.ShowDetailsButton} onClick={() => this.showDetailsHandler(id)}>
                                                {this.state.showDetails[id] === false
                                                    ? <p style={{margin:"0px",fontSize:"12px"}}>Show Details <span className={classes.ShowTrue}>&#62;</span></p>
                                                    : <p style={{margin:"0px",fontSize:"12px"}}>Hide Details <span className={classes.ShowFalse}>&#62;</span></p>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className={classes.Amount}>
                                        ${(Math.round(person.total * 100) / 100).toFixed(2)}
                                    </div>
                                </div>
                                <div className={classes.Details}>
                                    {this.state.showDetails[id] === true
                                        ? <div>{person.items.map((item, id) => {
                                            //look for item that the person claimed in items array
                                            let foundItem = this.props.items.find(findItem => item === findItem.itemId);
                                            //display the item & the split price
                                            return <p className={classes.DetailRow} key={id}>
                                                <span>{foundItem.name}</span>
                                                <span>${foundItem.splitPrice.toFixed(2)}</span>
                                            </p>
                                        })}
                                            {[...person.splitFees.keys()].map((feeName, id) => {
                                                return <p className={classes.DetailRow} key={id}>
                                                    <span>{feeName}</span>
                                                    <span>${person.splitFees.get(feeName).toFixed(2)}</span>
                                                </p>
                                            })}
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={classes.FeesAndTotal}>
                        <div className={classes.FeeItem}>
                            <span className={classes.FeeName}>Subtotal</span>
                            <span className={classes.Amount}>${this.props.subtotal.toFixed(2)}</span>
                        </div>
                        {this.props.fees.map((fee, id) => (
                            <div className={classes.FeeItem} key={id}>
                                <span className={classes.FeeName}>{fee.name}</span>
                                <span className={classes.Amount}>${fee.amount}</span>
                            </div>
                        ))}

                        <div className={classes.GrandTotal}>
                            <span className={classes.GrandTotalText}>Grand Total</span>
                            <span className={classes.Amount}>${this.props.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className={classes.Buttons}>
                    <button className={classes.ViewReceiptButton} onClick={this.props.onNextPage}>View Receipt</button>
                    <button className={classes.CloseButton}>Close</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        persons: state.persons,
        subtotal: state.subtotal,
        fees: state.fees,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNextPage: () => dispatch({ type: actionTypes.NEXT_PAGE })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);