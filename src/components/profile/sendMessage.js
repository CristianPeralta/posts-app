import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import history from '../../utils/history';
import {
    TextField,
    Button
} from '@material-ui/core';

class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            messageTo: this.props.location.state.props.profile.username,
            messageSender: this.props.dbProfile.username,
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
        );
    }
}

const mapStateToProps = state => {
    return {
        dbProfile: state.auth.dbProfile
    };
};

export default connect(mapStateToProps)(SendMessage);