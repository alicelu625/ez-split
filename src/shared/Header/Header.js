import React from 'react';

import classes from './Header.module.css';

const header = (props) => {
    return (
        <div className={classes.Header}>
            <button onClick={props.backClicked}>Back</button>
            {props.eventName}
        </div>
    );
}

export default header;