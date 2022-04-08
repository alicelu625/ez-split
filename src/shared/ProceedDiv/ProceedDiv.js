import React from 'react';

import classes from './ProceedDiv.module.css';

const proceedDiv = (props) => {
    return (
        <div className={classes.ProceedDiv}>
            <button className={classes.ProceedButton} onClick={props.clicked}>
                {props.children}
            </button>
        </div>
    )
}

export default proceedDiv;