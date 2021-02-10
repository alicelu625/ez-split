import React from 'react';

import classes from './ProceedDiv.module.css';

const proceedDiv = (props) => {
    return (
        <div className={classes.ProceedDiv} onClick={props.clicked}>
            {props.children}
        </div>
    )
}

export default proceedDiv;