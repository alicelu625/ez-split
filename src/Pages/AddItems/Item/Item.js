import React from 'react';

const item = (props) => {
    return (
        <div>
            {props.itemName}
            {props.itemPrice}
        </div>
    )
}

export default item;