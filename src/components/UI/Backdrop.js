import React from 'react';
import PropTypes from 'prop-types';

const Backdrop = (props) => (
    props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null
);

Backdrop.propTypes = {
    show: PropTypes.bool,
    clicked: PropTypes.func,
};

export default Backdrop;