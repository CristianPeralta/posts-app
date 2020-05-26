import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../../store/actions/actions';
import Message from '../Message';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';

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
                                    <Message
                                        key={message.mid}
                                        message={message}
                                        deleteUserMessage={this.props.onDeleteUserMessage}
                                        history={this.props.history} />
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
        onDeleteUserMessage: mid => dispatch(ACTIONS.deleteUserMessage(mid)),
        setUserMessages: messages => dispatch(ACTIONS.setUserMessages(messages)),
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(ShowMessages);