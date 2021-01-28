import React from 'react';

const modal = (props) => {
    return (
        <div
            style={{
                transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.showModal ? '1' : '0'
            }}
        >
            {props.children}
        </div>
    );
}

export default modal;