import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ClaimItems.module.css';
import Item from '../../shared/Item/Item';

class ClaimItems extends Component {
    render() {
        return (
            <div className={classes.ClaimItems}>
                <div>
                    {this.props.persons.map((person, id) =>
                        <div key={id}>
                            {person.name}
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    value="name"
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