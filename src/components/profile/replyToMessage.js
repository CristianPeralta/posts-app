import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../../store/actions/actions';
import {
    TextField,
    Button,
} from '@material-ui/core';

class ReplyToMessage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            messageTo: this.props.location.state.props.message.message_sender,
            messageSender: this.props.dbProfile.username,
            messageTitle: event.target.title.value,
            messageBody: event.target.body.value,
        };

        this.props.onSendUserMessage(data);
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
                        <button onClick={() => this.props.history.replace('/')} >
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
        dbProfile: state.auth.dbProfile,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSendUserMessage: data => dispatch(ACTIONS.sendUserMessage(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyToMessage);