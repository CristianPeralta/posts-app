import React, { Component } from 'react';
import history from '../../utils/history';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    TextField,
    Button,
} from '@material-ui/core';

class ReplyToMessage extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            messageSender: this.props.location.state.props.message.message_sender,
            messageTo: this.props.dbProfile.username,
            messageTitle: event.target.title.value,
            messageBody: event.target.body.value
        };

        axios.post('/users/messages', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .then(setTimeout(() => history.replace('/'), 500))
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

const mapStateToProps = state => {
    return {
        dbProfile: state.auth.dbProfile
    }
}

export default connect(mapStateToProps)(ReplyToMessage);