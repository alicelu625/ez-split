import React from 'react';
import Header from '../Header/Header';
import ProceedDiv from '../ProceedDiv/ProceedDiv';

const layout = (props) => {
    return (
        <div>
            <Header/>
            {props.children}
            <ProceedDiv/>
        </div>
    )
}

export default layout;