import React from 'react';

import classes from './Header.module.css';

const header = (props) => {
    return (
        <div className={classes.Header}>
            <button onClick={props.backClicked} className={classes.BackButton}>Back</button>
            <span className={classes.EventName}>{props.eventName}</span>
        </div>
    );
}

export default header;