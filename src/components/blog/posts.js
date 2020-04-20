import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as ACTIONS from '../../store/actions/actions';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    TextField
} from '@material-ui/core';

const RenderPosts = ({post}) => {
    return (
        <div className="CardStyles">
            <Card style={{width:'500px', height: '200px', marginBottom: '10px', paddingBottom: '80px'}}>
                <CardHeader
                title={<Link to={{ pathname: '/post/' + post.pid, state: {post} }} >
                        {post.title}
                        </Link>}
                subheader={
                    <div className='FlexColumn'>
                        <div className='FlexRow'>
                            {moment(post.date_created).format('MMMM Do, YYYY | h:mm:ss a')}
                        </div>
                        <div className="FlexRow">
                            <i className="material-icons">thumb_up</i>
                            <div className="notification-num-posts">
                                {post.likes}
                            </div>
                        </div>
                    </div>
                }
                />
                <br />
                <CardContent>
                <span style={{overflow: 'hidden'}}>{post.body}</span>
                </CardContent>
            </Card>
        </div>
    );
}

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            postsMotion: [],
            opacity: 0,
            numPosts: 0,
            pageRange: 0,
            activePage: 1,
            PostsPerPage: 5,
            postsSlice: [],
            postsSearch: [],
            postsSearchMotion: []
        }
        this.slicePosts = this.slicePosts.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.handleTransition();
        axios.get('/posts')
            .then(res => this.props.setPosts(res.data))
            .then(() => this.addPostsToState(this.props.posts))
            .catch(error => console.log(error));
    }
    handleTransition () {
        setTimeout(() => this.setState({opacity: 1}), 400);
    }
    addPostsToState(posts) {
        this.setState({posts: [...posts]});
        this.setState({numPosts: this.state.posts.length, pageRange: this.state.numPosts/5});
        this.slicePosts();
        this.animatePosts();
    }
    handleSearch(event) {
        const query = event.target.value;
        axios.get('/search', { params: { query }})
            .then(res => this.props.postsSuccess(res.data))
            .then(() => this.addSearchPostsToState(this.props.searchPosts))
            .catch(() => this.props.postsFailure())
    }
    addSearchPostsToState(posts) {
        this.setState({posts: []});
        this.setState({posts: [...posts]});
        this.animateSearchPosts();
    }
    animateSearchPosts() {
        this.setState({postsSearchMotion: []});
        let i = 1;
        this.state.postsSearch.map(post => {
            setTimeout(() => {
                this.setState({postsMotion: [...this.state.postsSearchMotion, post]})
                i++;
            }, 400*i);
        })
    }
    slicePosts() {
        const indexOfLastPost = this.state.activePage * this.state.PostsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.PostsPerPage;
        console.log('posts', this.state.posts);
        console.log(indexOfLastPost, indexOfFirstPost);
        this.setState({
            postsSlice: this.state.posts.slice(indexOfFirstPost, indexOfLastPost)
        });
    }

    animatePosts() {
        this.setState({postsMotion: []});
        console.log('postsSlice', this.state.postsSlice);
        let i = 1;
        this.state.postsSlice.forEach(post => {
            setTimeout(
                () => {
                    this.setState({ postsMotion: [...this.state.postsMotion, post]});
                }, 400*i);
            i++;
        });
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        setTimeout(() => this.slicePosts(), 50);
        setTimeout(() => this.animatePosts(), 100);
    }
    render() {
        return (
            <div>
                <div style={{opacity: this.state.opacity, transition: 'opacity 2s ease'}}>
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
                        onChange={this.addSearchPostsToState}
                    />
                </div>
                <div style={{opacity: this.state.opacity, transition: 'opacity 2s ease'}}>
                    <h1>Posts</h1>
                    <div>
                        {this.state.postsMotion.map(
                            post => <RenderPosts opacity={this.state.opacity} key={post.pid} post={post} />
                        )}
                    </div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={this.state.numPosts}
                        pageRangeDisplayed={this.state.pageRange}
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
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setPosts: posts => dispatch(ACTIONS.fetchPosts(posts)),
        postsSuccess: posts => dispatch(ACTIONS.fetchSearchPosts(posts)),
        postsFailure: () => dispatch(ACTIONS.removeSearchPosts())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);