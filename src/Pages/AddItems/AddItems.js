import React, {Component} from 'react';

import classes from './AddItems.module.css';

class AddItems extends Component {
    render() {
        return (
            <div className={classes.AddItems}>
                <div>
                    subtotal
                </div>
                <div>
                    item components
                </div>
            </div>
        );
    }
}

export default AddItems;