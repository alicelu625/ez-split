import React from 'react';

import classes from './Item.module.css';

const item = (props) => {
    return (
        <div className={classes.Item}>
            <p>{props.itemName}</p>
            <p>${props.itemPrice}</p>
        </div>
    )
}

export default item;