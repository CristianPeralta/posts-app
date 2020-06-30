import React from 'react';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';

const Message = props => {
    return (
        <TableRow>
            <TableCell>
                <p> From: {props.message.message_sender}</p>
                <p> Title: {props.message.message_title}</p>
                <p> Message: {props.message.message_body}</p>
                <small>{props.message.date_created}</small>
                <br />
                <Link to={{pathname: '/reply', search: `?to=${props.message.message_sender}&ko="asdsad"`, state: { props: { message: props.message } }}}>
                    <button >
                        Reply
                    </button>
                </Link>
                <button onClick={() => props.deleteUserMessage(props.message.mid)}> Delete </button>
                <br />
                <br />
                <button onClick={() => props.history.goBack()}> Cancel </button>

            </TableCell>
        </TableRow>
    );
};

Message.propTypes = {
    message: PropTypes.object,
    history: PropTypes.object,
    deleteUserMessage: PropTypes.func,
};

export default Message;
