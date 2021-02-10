import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ClaimItems.module.css';
import Item from '../../shared/Item/Item';
import * as actionTypes from '../../store/actions';

class ClaimItems extends Component {
    state = {
        currentPerson: 0
    }

    changePersonHandler = (id) => {
        this.setState({currentPerson: id});
    }

    render() {
        return (
            <div className={classes.ClaimItems}>
                <div>
                    {this.props.persons.map((person, id) =>
                        <div key={id} className={classes.Person} onClick={() => this.changePersonHandler(id)}>
                            {person.name}
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    value={this.props.persons[this.state.currentPerson].name}
                    onChange={(event) => this.props.onChangeName(event, this.state.currentPerson)}
                />
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
        onChangeName: (event, id) => dispatch({type: actionTypes.CHANGE_NAME, event: event, id: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimItems);