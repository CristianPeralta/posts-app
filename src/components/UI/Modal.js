import React from 'react';
import Backdrop from './Backdrop';
import PropTypes from 'prop-types';

const Modal = props => {
    return (
        <div>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div
                className="Modal"
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                    {props.children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    show: PropTypes.bool,
    modalClosed: PropTypes.func,
    children: PropTypes.element,
};

export default Modal;