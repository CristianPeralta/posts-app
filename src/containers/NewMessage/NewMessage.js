import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../../store/actions/actions';
import { Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to: (new URLSearchParams(this.props.location.search)).get("to"),
            submited: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            messageTo: this.state.to,
            messageSender: this.props.dbProfile.username,
            messageTitle: event.target.title.value,
            messageBody: event.target.body.value
        };

        this.props.onSendUserMessage(data);

        this.setState({ submited: true });
    }
    render() {
        return (
            <div>
                {this.state.submited ? <Redirect to="/" /> : null}
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
        );
    }
}

const mapStateToProps = state => {
    return {
        dbProfile: state.auth.dbProfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSendUserMessage: data => dispatch(ACTIONS.sendUserMessage(data)),
    };
};

SendMessage.propTypes = {
    history: PropTypes.object,
    dbProfile: PropTypes.object,
    location: PropTypes.object,
    onSendUserMessage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);