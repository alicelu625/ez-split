import React, {Fragment} from 'react';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const modal = (props) => {
    return (
        <Fragment>
            <Backdrop showBackdrop={props.showModal} backdropClicked={props.closeModal}/>
            <div
                className={classes.Modal}
                style={{
                    transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.showModal ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Fragment>
    );
}

export default modal;