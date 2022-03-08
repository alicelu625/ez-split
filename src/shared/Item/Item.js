import React from 'react';

import classes from './Item.module.css';

const item = (props) => {
    //if on AddItems or on ClaimItems but item has no claimers, show regular type
    let itemType = <div className={classes.RegularItem}>
        <p className={classes.ItemName}>{props.itemName}</p>
        <p className={classes.ItemPrice}>${props.itemPrice}</p>
    </div>

    //if on ClaimItems page and item has claimers, show claimedItem type
    if (props.currentPage === 2 && props.claimers.length > 0) {
        itemType = <div className={classes.ClaimedItem}>
            <div className={classes.ItemInfo}>
                <p>{props.itemName}</p>
                <p>${props.itemPrice}</p>
            </div>
            <div className={classes.Persons}>
                {props.claimers.map((person, id) => {
                    //look for person name in persons array
                    let foundPerson = props.persons.find(findPerson => person === findPerson.personId);
                    //display the item & the split price
                    return <div key={id} className={classes.Person}>{foundPerson.name}</div>
                })}
            </div>
        </div>
    }
    
    return itemType;
}

export default item;