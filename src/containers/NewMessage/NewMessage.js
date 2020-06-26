import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../../store/actions/actions';
import { Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const NewMessage = props => {
  const [submited, setSubmited] = useState(false);
  const to = (new URLSearchParams(props.location.search)).get("to");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        messageTo: to,
        messageSender: props.dbProfile.username,
        messageTitle: event.target.title.value,
        messageBody: event.target.body.value
    };

    props.onSendUserMessage(data);
    setSubmited(true);
  };

  return (
    <div>
        {submited ? <Redirect to="/" /> : null}
        <form onSubmit={handleSubmit}>
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
            <button onClick={() => props.history.replace('/')} >
                Cancel
            </button>
        </form>
    </div>
  );
};

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

NewMessage.propTypes = {
    history: PropTypes.object,
    dbProfile: PropTypes.object,
    location: PropTypes.object,
    onSendUserMessage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
