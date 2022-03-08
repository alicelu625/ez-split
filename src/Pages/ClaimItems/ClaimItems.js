import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./ClaimItems.module.css";
import Item from "../../shared/Item/Item";
import ProceedDiv from '../../shared/ProceedDiv/ProceedDiv';
import * as actionTypes from "../../store/actions";

class ClaimItems extends Component {
    //local state
    state = {
        currentPerson: 0
    }

    //selected person
    changePersonHandler = (id) => {
        this.setState({ currentPerson: id });
    }

    //remove selected person
    removePersonHandler = () => {
        this.props.onRemovePerson(this.state.currentPerson);

        //if 1st person removed, reset selected person to next person
        if (this.state.currentPerson === 0) {
            this.setState({ currentPerson: this.state.currentPerson });
        }
        //if not 1st person removed, reset selected person to previous person
        else {
            this.setState({ currentPerson: this.state.currentPerson - 1 });
        }
    }

    render() {
        return (
            <div className={classes.ClaimItems}>
                <div className={classes.Persons}>
                    {this.props.persons.map((person, id) => (
                        <div
                            key={id}
                            className={classes.Person}
                            onClick={() => this.changePersonHandler(id)}
                        >
                            {person.name}
                        </div>
                    ))}
                    <button className={classes.AddPersonButton} onClick={this.props.onAddPerson}>+</button>
                </div>
                <div className={classes.EditPerson}>
                    <input
                        className={classes.PersonNameField}
                        type="text"
                        value={this.props.persons[this.state.currentPerson].name}
                        onChange={(event) =>
                            this.props.onChangeName(event, this.state.currentPerson)
                        }
                    />
                    <button className={classes.RemovePersonButton} onClick={this.removePersonHandler}>-</button>
                </div>

                <p className={classes.Prompt}>Which items did <span style={{fontWeight:'bold'}}>{this.props.persons[this.state.currentPerson].name}</span> split?</p>
                
                <div className={classes.Items}>
                    {this.props.items.map((item, id) => (
                        <div key={id} className={classes.ItemRow}>
                            <Item
                                itemName={item.name}
                                itemPrice={item.price.toFixed(2)}
                                currentPage={this.props.currentPage}
                                claimers={this.props.items[id].persons}
                                persons={this.props.persons}
                            />
                            <button
                                className={classes.ClaimButton}
                                onClick={() =>
                                    this.props.onClaimItem(
                                        this.state.currentPerson,
                                        id
                                    )
                                }
                            >
                                Claim
                            </button>
                        </div>
                    ))}
                </div>
                <div className={classes.Subtotal}>
                    <p className={classes.SubtotalText}>Subtotal</p>
                    <p>${this.props.subtotal.toFixed(2)}</p>
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
        subtotal: state.subtotal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeName: (event, id) =>
            dispatch({ type: actionTypes.CHANGE_NAME, event: event, id: id }),
        onAddPerson: () => dispatch({ type: actionTypes.ADD_PERSON }),
        onRemovePerson: (id) =>
            dispatch({ type: actionTypes.REMOVE_PERSON, id: id }),
        onClaimItem: (selectedPerson, selectedItem) =>
            dispatch({
                type: actionTypes.CLAIM_ITEM,
                selectedPerson: selectedPerson,
                selectedItem: selectedItem
            }),
        onNextPage: () => dispatch({ type: actionTypes.NEXT_PAGE })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimItems);
