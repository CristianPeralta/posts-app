import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../utils/history';
import axios from 'axios';
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
            .then(() => setTimeout(() => history.replace('/'), 700));
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
                <button onClick={() => history.goBack()}> Cancel </button>
            </TableCell>
        </TableRow>
    );
};
class ShowMessages extends Component {
    componentDidMount() {
        const username = this.props.dbProfile.username;
        axios.get('/users/messages', {params: {username: username}})
            .then(res =>  this.props.setUserMessages(res.data))
            .catch(error => console.log(error));
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
                                    <RenderMessages key={message.mid} message={message}/>
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
        setUserMessages: messages => dispatch(ACTIONS.setUserMessages(messages))
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(ShowMessages);