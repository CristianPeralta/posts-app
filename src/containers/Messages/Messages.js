import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../../store/actions/actions';
import Message from '../../components/Message';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';

const Messages = props => {
  useEffect(() => {
    const username = props.dbProfile.username;
    props.onFetchUserMessages(username);
  }, []);
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
                    {props.userMessages
                        ? props.userMessages.map(message =>
                            <Message
                                key={message.mid}
                                message={message}
                                deleteUserMessage={props.onDeleteUserMessage}
                                history={props.history} />
                            )
                        : null
                    }
                </TableBody>
            </Table>
        </div>
    </div>
  );
};

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
    };
};

Messages.propTypes = {
    history: PropTypes.object,
    dbProfile: PropTypes.object,
    userMessages: PropTypes.array,
    onFetchUserMessages: PropTypes.func,
    onDeleteUserMessage: PropTypes.func,
};

export default  connect(mapStateToProps, mapDispatchToProps)(Messages);
