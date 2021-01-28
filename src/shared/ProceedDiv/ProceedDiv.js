import React from 'react';

import classes from './ProceedDiv.module.css';

const proceedDiv = (props) => {
    return (
        <div className={classes.ProceedDiv} onClick={props.clicked}>
            Next
        </div>
    )
}

export default proceedDiv;