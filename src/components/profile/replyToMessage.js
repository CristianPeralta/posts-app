import React, { Component } from 'react';
import history from '../../utils/history';
import {
    TextField,
    Button,
} from '@material-ui/core';

class ReplyToMessage extends Component {
    handleSubmit() {
        return;
    }
    render() {
        return (
            <div>
                <h2>Message:</h2>
                <div className='FlexColumn'>
                    <div>
                        <p>{ this.props.location.state.props.message.message_title }</p>
                    </div>
                    <div>
                        <p>{ this.props.location.state.props.message.message_body }</p>
                    </div>
                    <div>
                        <p>By: {this.props.location.state.props.message.message_sender}</p>
                    </div>
                </div>
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
                        <button onClick={() => history.replace('/')} >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ReplyToMessage;