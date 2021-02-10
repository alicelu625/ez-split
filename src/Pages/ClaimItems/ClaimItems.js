import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ClaimItems.module.css';
import Item from '../../shared/Item/Item';

class ClaimItems extends Component {
    state = {
        currentPerson: this.props.persons[0]
    }

    changePersonHandler = (id) => {
        console.log(id);
        this.setState({currentPerson: this.props.persons[id]});
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
                    value={this.state.currentPerson.name}
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

export default connect(mapStateToProps)(ClaimItems);