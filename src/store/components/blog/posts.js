import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';

class Posts extends Component {
    render() {
        return (
            <div>
                <h1>Posts</h1>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Title
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            BODY
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default connect()(Posts);