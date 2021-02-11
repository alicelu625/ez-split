import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ClaimItems.module.css';
import Item from '../../shared/Item/Item';
import * as actionTypes from '../../store/actions';

class ClaimItems extends Component {
    state = {
        currentPerson: 0
    }

    //selected person
    changePersonHandler = (id) => {
        this.setState({currentPerson: id});
    }

    //remove selected person
    removePersonHandler = () => {
        this.props.onRemovePerson(this.state.currentPerson);
        //reset selected person to previous
        this.setState({currentPerson: this.state.currentPerson-1});
    }

    render() {
        return (
            <div className={classes.ClaimItems}>
                <div className={classes.Persons}>
                    {this.props.persons.map((person, id) =>
                        <div key={id} className={classes.Person} onClick={() => this.changePersonHandler(id)}>
                            {person.name}
                        </div>
                    )}
                </div>
                <button onClick={this.props.onAddPerson}>Add Person</button>
                <br/>
                <input
                    type="text"
                    value={this.props.persons[this.state.currentPerson].name}
                    onChange={(event) => this.props.onChangeName(event, this.state.currentPerson)}
                />
                <button onClick={this.removePersonHandler}>-</button>
                <div>
                    {this.props.items.map((item, id) =>
                        <Item
                            key={id}
                            itemName={item.name}
                            itemPrice={item.price}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items,
        persons: state.persons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeName: (event, id) => dispatch({type: actionTypes.CHANGE_NAME, event: event, id: id}),
        onAddPerson: () => dispatch({type: actionTypes.ADD_PERSON}),
        onRemovePerson: (id) => dispatch({type:actionTypes.REMOVE_PERSON, id: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimItems);