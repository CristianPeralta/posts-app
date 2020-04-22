import React, { Component } from 'react';

import {
    TextField,
    Button
} from '@material-ui/core';

class SendMessage extends Component {
    render() {
        return (
            <div>
                <form onSubmit={() => {}}>
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