import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
                        <div className='FlexRow'>
                            <Link style={{paddingLeft: '5ps', textDecoration: 'none'}}
                                to={{pathname: '/user/' + post.author, state:{post}}}>
                                By: {post.author}
                            </Link>
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
            postsMotion: [],
            opacity: 0,
            activePage: 1,
            PostsPerPage: 5,
            postsSlice: [],
            postsSearch: [],
            postsSearchMotion: []
        }
        this.slicePosts = this.slicePosts.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.handleTransition();
        this.props.onFetchPosts();
    }
    handleTransition () {
        setTimeout(() => this.setState({opacity: 1}), 400);
    }
    addPostsToState() {
        // this.setState({numPosts: this.props.posts.length, pageRange: this.props.posts.length/5});
        // this.slicePosts();
        this.animatePosts();
    }
    handleSearch(event) {
        const query = event.target.value;
        this.props.onFetchPosts(query);
        /* axios.get('/posts', { params: { query }})
            .then(res => this.props.postsSuccess(res.data))
            .then(() => this.addSearchPostsToState(this.props.searchPosts))
            .catch(() => this.props.postsFailure()) */
    }
    addSearchPostsToState(posts) {
        this.setState({postsSearch: []});
        this.setState({postsSearch: [...posts]});
        this.animateSearchPosts();
    }
    animateSearchPosts() {
        this.setState({postsSearchMotion: []});
        let i = 1;
        this.state.postsSearch.forEach(post => {
            setTimeout(() => {
                this.setState({postsSearchMotion: [...this.state.postsSearchMotion, post]})
                i++;
            }, 400*i);
        })
    }
    slicePosts() {
        const indexOfLastPost = this.state.activePage * this.state.PostsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.PostsPerPage;
        this.setState({
            postsSlice: this.props.posts.slice(indexOfFirstPost, indexOfLastPost)
        });
    }

    animatePosts() {
        this.setState({postsMotion: []});
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
                        onChange={this.handleSearch}
                    />
                </div>
                <div>
                {this.state.postsSearch
                    ? this.state.postsSearchMotion.map(post =>
                        <RenderPosts key={post.pid} post={post} />
                        )
                    : null
                }
                </div>
                <div style={{opacity: this.state.opacity, transition: 'opacity 2s ease'}}>
                    <h1>Posts</h1>
                    <div>
                    {   this.props.posts
                        ? this.props.posts.map(
                                post => <RenderPosts opacity={this.state.opacity} key={post.pid} post={post} />
                        )
                        : null
                    }
                    </div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={this.props.posts.length}
                        pageRangeDisplayed={this.props.posts.length/5}
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
        postsFailure: () => dispatch(ACTIONS.removeSearchPosts()),
        onFetchPosts: query => dispatch(ACTIONS.fetchPosts(query))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);