import React, {Component} from 'react';

import Header from '../../shared/Header/Header';
import ProceedDiv from '../../shared/ProceedDiv/ProceedDiv';
import classes from './AddItems.module.css';

class AddItems extends Component {
    render() {
        return (
            <div className={classes.AddItems}>
                <Header/>
                <div>
                    subtotal
                </div>
                <div>
                    item components
                </div>
                <ProceedDiv/>
            </div>
        );
    }
}

export default AddItems;