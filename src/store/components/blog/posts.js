import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTIONS from '../../actions/actions';
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
                            {this.props.posts.map(
                                post => <RenderPosts key={post.pid} post={post} />
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setPosts: posts => dispatch(ACTIONS.someFunction),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);