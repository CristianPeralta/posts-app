import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';

const RenderMessages = props => {
    return (
        <div>
            RENDER MESSAGES
        </div>
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