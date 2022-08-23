import React from 'react';

import classes from './Header.module.css';

const header = (props) => {
    return (
        <div className={classes.Header}>
            <div className={classes.FixedWidthContainer}>
                <button onClick={props.backClicked} className={classes.BackButton}>&lt;</button>
                <span className={classes.EventName}>{props.eventName}</span>
            </div>
        </div>
    );
}

export default header;