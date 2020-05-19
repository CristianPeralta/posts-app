import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../axios';
import * as ACTIONS from '../../store/actions/actions';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';

const RenderMessages = props => {
    const deleteMessage = (mid) => {
        axios.delete('/users/messages', { data: { mid: mid }})
            .then(res => console.log(res))
            .catch(error =>  console.log(error))
            .then(() => setTimeout(() => props.history.replace('/'), 700));
    }
    return (
        <TableRow>
            <TableCell>
                <p> From: {props.message.message_sender}</p>
                <p> Title: {props.message.message_title}</p>
                <p> Message: {props.message.message_body}</p>
                <small>{props.message.date_created}</small>
                <br />
                <Link to={{pathname: '/reply', state: {props}}}>
                    <button>
                        Reply
                    </button>
                </Link>
                <button onClick={() => deleteMessage(props.message.mid)}> Delete </button>
                <br />
                <br />
                <button onClick={() => props.history.goBack()}> Cancel </button>
            </TableCell>
        </TableRow>
    );
};
class ShowMessages extends Component {
    componentDidMount() {
        const username = this.props.dbProfile.username;
        this.props.onFetchUserMessages(username);
    }
    render() {
        return (
            <div>
                <div className='FlexRow'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Messages </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.userMessages
                                ? this.props.userMessages.map(message =>
                                    <RenderMessages key={message.mid} message={message} history={this.props.history} />
                                    )
                                : null
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dbProfile: state.auth.dbProfile,
        userMessages: state.user.userMessages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserMessages: (username) => dispatch(ACTIONS.fetchUserMessages(username)),
        setUserMessages: messages => dispatch(ACTIONS.setUserMessages(messages)),
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(ShowMessages);