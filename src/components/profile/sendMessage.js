import React, { Component } from 'react';
import axios from 'axios';
import {
    TextField,
    Button
} from '@material-ui/core';

class SendMessage extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            messageSender: this.props.location.state.props.profile.username,
            messageTo: this.props.dbProfile.username,
            messageTitle: event.target.value,
            messageBody: event.target.body.value
        };

        axios.post('/send-message', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id='title'
                        label='title'
                        margin='normal'
                    />
                    <br />
                    <TextField
                        id='body'
                        multiline
                        rows='4'
                        margin='normal'
                    />
                    <br />
                    <Button type='submit' variant='contained' color='primary' >
                        Submit
                    </Button>
                    <button onClick={() => {}} >
                        Cancel
                    </button>
                </form>
            </div>
        );
    }
}

export default SendMessage;