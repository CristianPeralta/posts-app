import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
  
const ModalDialog = props => {
    return (
        <Dialog
            open={props.open}
            onClose={props.close}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
            <DialogContent>
            <DialogContentText id='alert-dialog-description'>
                {props.children}
            </DialogContentText>
            <DialogActions>
                <Button onClick={() => props.agreeAction()}>
                Agree
                </Button>
                <Button onClick={() => props.cancelAction()}>
                Cancel
                </Button>
            </DialogActions>
            </DialogContent>
      </Dialog>
    );
};

ModalDialog.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.element,
    agreeAction: PropTypes.func,
    cancelAction: PropTypes.func,
};

export default ModalDialog;