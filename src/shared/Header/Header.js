import React, {Component} from 'react';
import {connect} from 'react-redux';

const header = (props) => {
    return (
        <div>
            <p>{props.eventName}</p>
        </div>
    );
}

export default header;