import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';

const RenderPosts = post => (
    <TableRow>
        <TableCell>
            <Link to={{
                pathname: '/post/' + post.post.pid,
                state: {post}
            }} >
                <h4>
                    {post.post.title}
                </h4>
            </Link>
        </TableCell>
    </TableRow>
);

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