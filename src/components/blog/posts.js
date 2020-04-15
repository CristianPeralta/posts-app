import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as ACTIONS from '../../store/actions/actions';
import {
    Card,
    CardContent,
    CardHeader,
    Button
} from '@material-ui/core';

const RenderPosts = ({post}) => {
    return (
        <div>
            <Card style={{width:'500px', height: '200px', marginBottom: '10px', paddingBottom: '80px'}}>
                <CardHeader
                title={<Link to={{ pathname: '/post/' + post.pid, state: {post} }} >
                        {post.title}
                        </Link>}
                subheader={
                    <div className='FlexColumn'>
                        <div className='FlexRow'>
                            {post.date_created}
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
            opacity: 1
        }
    }

    componentDidMount() {
        console.log('this.props', this.props);
        axios.get('/posts')
            .then(res => this.props.setPosts(res.data))
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                <button onClick={() => this.setState({opacity: this.state.opacity === 0 ? 1 : 0})} >SHOW</button>
                <div style={{opacity: this.state.opacity, transition: 'opacity 2s ease'}}>
                    <br />
                    <Link to='/addpost' >
                        <Button color='primary'>
                            Add Post
                        </Button>
                    </Link>
                </div>
                <div style={{opacity: this.state.opacity, transition: 'opacity 2s ease'}}>
                    <h1>Posts</h1>
                    <div>
                        {this.props.posts.map(
                            post => <RenderPosts key={post.pid} post={post} />
                        )}
                    </div>
                </div>
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