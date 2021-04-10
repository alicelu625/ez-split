import React, { Component } from "react";
import { connect } from "react-redux";

import classes from './Results.module.css';

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
        this.setState({showDetails: tempArr});
    }

    render() {
        return (
            <div className={classes.Results}>
                <h3>Your Bill</h3>
                <div>
                    {this.props.persons.map((person, id) => (
                        <div key={id}>
                            <div>
                                {person.name}
                                <button onClick={() => this.showDetailsHandler(id)}>Show details</button>
                                {person.total}
                            </div>
                            <div>
                                {this.state.showDetails[id] === true
                                ? <div>{person.items.map((item, id) => {
                                    //look for item that the person claimed in items array
                                    let foundItem = this.props.items.find(findItem => item === findItem.name);
                                    //display the item & the split price
                                    return <p key={id}>{foundItem.name}: {foundItem.splitPrice.toFixed(2)}</p>
                                })}
                                {[...person.splitFees.keys()].map((feeName, id) => {
                                    return <p key={id}>{feeName}: {person.splitFees.get(feeName).toFixed(2)}</p>
                                })}
                                </div>
                                : null
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <div>Subtotal: {this.props.subtotal}</div>
                {this.props.fees.map((fee, id) => (
                    <div key={id}>
                        {fee.name}: {fee.amount}
                    </div>
                ))}
                <div>Grand Total: {this.props.total}</div>
                <button>View Receipt</button>
                <button>Close</button>
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

export default connect(mapStateToProps)(Results)