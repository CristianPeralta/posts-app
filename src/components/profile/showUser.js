import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import * as ACTIONS from '../../store/actions/actions';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
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
                            By: {post.author}
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
};

const RenderProfile = props => {
    return (
        <div>
            <div className='FlexRow'>
                <h1>
                    {props.profile.username}
                </h1>
            </div>
            <div>
                <Link to={{pathname: '/send-message', state:{props}}}>
                    <Button variant='contained' color='primary' type='submit'>
                        Send Message
                    </Button>
                </Link>
            </div>
        </div>
    );
};

class ShowUser extends Component {
    componentDidMount() {
        const username = this.props.location.state.post.author;
        axios.get('/users', { params: { username: username }})
            .then(res => this.props.setProfile(res.data[0]))
            .catch(err => console.log(err));
        axios.get('/posts/username', { params: { username: username }})
            .then(res => this.props.setPosts(res.data))
            .catch(err => console.log(err))
        window.scrollTo({ top: 0, left: 0});
    }
    render() {
        return (
            <div>
                {   this.props.profile
                    ? <RenderProfile profile={this.props.profile} />
                    : null
                }
                <div>
                    <h2>Latest Activity: </h2>
                        <div>
                            {this.props.userPosts
                                ? this.props.userPosts.map(post =>
                                    <div>
                                        <RenderPosts key={post.pid} post={post} />
                                        <br />
                                    </div>
                                    )
                                : null
                            }
                        </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.user.otherUserProfile,
        userPosts: state.user.otherUserPosts
    };
};


const mapDispatchToProps = dispatch => {
    return {
        setProfile: (profile) => dispatch(ACTIONS.setOtherUserProfile(profile)),
        setPosts: posts => dispatch(ACTIONS.setOtherUserPosts(posts))
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(ShowUser);