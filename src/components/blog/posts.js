import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as ACTIONS from '../../store/actions/actions';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@material-ui/core';

const RenderPosts = props => {
    return (
        <TableRow>
            <TableCell>
                <Link to={{
                    pathname: '/post/' + props.post.pid,
                    state: {post: props.post}
                }} >
                    <h4>
                        {props.post.title}
                    </h4>
                </Link>
            </TableCell>
        </TableRow>
    );
}

class Posts extends Component {
    componentDidMount() {
        console.log('this.props', this.props);
        axios.get('/posts')
            .then(res => this.props.setPosts(res.data))
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                <br />
                <Link to='/addpost' >
                    <Button color='primary'>
                        Add Post
                    </Button>
                </Link>
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
        posts: state.post.posts,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setPosts: posts => dispatch(ACTIONS.fetchPosts(posts)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);