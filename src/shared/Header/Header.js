import React from 'react';

import classes from './Header.module.css';

const header = (props) => {
    return (
        <div className={classes.Header}>{props.eventName}</div>
    );
}

export default header;