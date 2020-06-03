import React from 'react';
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
                {props.text}
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

export default ModalDialog;