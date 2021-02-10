import React, {Component} from 'react';
import {connect} from 'react-redux';

import Item from '../../shared/Item/Item';

class ClaimItems extends Component {
    render() {
        return (
            <div>
                <div>Persons</div>
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
        items: state.items
    }
}

export default connect(mapStateToProps)(ClaimItems);