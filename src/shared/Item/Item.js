import React from 'react';

import classes from './Item.module.css';

const item = (props) => {
    //if on AddItems or on ClaimItems but item has no claimers, show regular type
    let itemType = <div className={classes.RegularItem}>
        <p>{props.itemName}</p>
        <p>${props.itemPrice}</p>
    </div>

    //if on ClaimItems page and item has claimers, show claimedItem type
    if (props.currentPage === 2 && props.claimers.length > 0) {
        itemType = <div className={classes.ClaimedItem}>
            <div className={classes.ItemInfo}>
                <p>{props.itemName}</p>
                <p>${props.itemPrice}</p>
            </div>
            <div className={classes.Persons}>
                {props.claimers.map((person, id) =>
                    <div key={id} className={classes.Person}>{person}</div>
                )}
            </div>
        </div>
    }
    
    return itemType;
}

export default item;