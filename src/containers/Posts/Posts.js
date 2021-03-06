import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTIONS from '../../store/actions/actions';
import Pagination from 'react-js-pagination';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios';
import { Button, TextField } from '@material-ui/core';
import Post from '../../components/Post';
import PropTypes from 'prop-types';

const Posts = props => {
  const [activePage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    props.onFetchPosts();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    props.onFetchPosts({query});
  };

  const handlePageChange = (pageNumber) => {
      console.log('handlePageChange', pageNumber);
  };

  return (
    <div>
        <div>
            <br />

            {props.isAuthenticated ?
                <Link to='/posts/new' >
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
                onChange={handleSearch}
            />
        </div>
        <div>
            <h1>Posts</h1>
            <div>
            {   props.posts
                ? props.posts.map(
                        post => <Post
                            key={post.pid}
                            post={post}
                            showAuthor
                            isAuthenticated={props.isAuthenticated}
                            history={props.history}
                            profile={props.profile}
                            onAddPostLike={props.onAddPostLike}
                            />
                )
                : null
            }
            </div>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={postsPerPage}
                totalItemsCount={props.posts.length}
                pageRangeDisplayed={props.posts.length/postsPerPage}
                onChange={handlePageChange}
            />
        </div>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        profile: state.auth.dbProfile,
        searchPosts: state.post.searchPosts,
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: query => dispatch(ACTIONS.fetchPosts(query)),
        onAddPostLike: data => dispatch(ACTIONS.addPostLike(data)),
    };
};

Posts.propTypes = {
    posts: PropTypes.array,
    history: PropTypes.object,
    profile: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    onFetchPosts: PropTypes.func,
    onAddPostLike: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Posts, axios));
