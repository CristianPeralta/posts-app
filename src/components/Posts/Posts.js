import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTIONS from '../../store/actions/actions';
import Pagination from 'react-js-pagination';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios';
import {
    Button,
    TextField,
} from '@material-ui/core';
import Post from './Post/Post';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            PostsPerPage: 5,
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.props.onFetchPosts();
    }
    handleSearch(event) {
        const query = event.target.value;
        this.props.onFetchPosts({query});
    }

    handlePageChange(pageNumber) {
        console.log('handlePageChange', pageNumber);
    }
    render() {
        return (
            <div>
                <div>
                    <br />

                    {this.props.isAuthenticated ?
                        <Link to='/addpost' >
                            <Button variant='contained' color='primary'>
                                Add Post
                            </Button>
                        </Link>
                        : <Link to='/signup' >
                            <Button variant='contained' color='primary'>
                                Signup to Add Post
                            </Button>
                        </Link>
                    }
                </div>
                <div>
                    <TextField
                        id='search'
                        label='Search'
                        margin='normal'
                        onChange={this.handleSearch}
                    />
                </div>
                <div>
                    <h1>Posts</h1>
                    <div>
                    {   this.props.posts
                        ? this.props.posts.map(
                                post => <Post key={post.pid} post={post} showAuthor />
                        )
                        : null
                    }
                    </div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.PostsPerPage}
                        totalItemsCount={this.props.posts.length}
                        pageRangeDisplayed={this.props.posts.length/this.state.PostsPerPage}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        searchPosts: state.post.searchPosts,
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: query => dispatch(ACTIONS.fetchPosts(query)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Posts, axios));