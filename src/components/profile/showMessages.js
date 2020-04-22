import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';

const RenderMessages = props => {
    return (
        <TableRow>
            <TableCell>
                <p> From: {props.message.message_render}</p>
                <p> Title: {props.message.message_title}</p>
                <p> Message: {props.message.message_body}</p>
                <small>{props.message.date_created}</small>
                <Link to={{pathname: '/reply', state: {props}}}>
                    <button>
                        Reply
                    </button>
                </Link>
                <button onClick={() => {}} > Delete </button>
                <br />
                <br />
                <button>Cancel</button>
            </TableCell>
        </TableRow>
    );
};
class ShowMessages extends Component {
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

export default ShowMessages;