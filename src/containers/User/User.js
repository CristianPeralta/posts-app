import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTIONS from '../../store/actions/actions';
import Post from '../../components/Post';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const RenderProfile = props => {
    return (
        <div>
            <div className='FlexRow'>
                <h1>
                    {props.profile.username}
                </h1>
            </div>
            <div>
                <Link to={{pathname: `/message/new`, search: `?to=${props.profile.username}`}}>
                    <Button variant='contained' color='primary' type='submit'>
                        Send Message
                    </Button>
                </Link>
            </div>
        </div>
    );
};

RenderProfile.propTypes = {
    profile: PropTypes.object,
};

class User extends Component {
    componentDidMount() {
        const username = this.props.match.params.username;
        this.props.onGetOtherUser(username);
        this.props.onFetchOtherUserPosts(username);
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
                                    <div key={post.pid}>
                                        <Post post={post} />
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
        onGetOtherUser: username => dispatch(ACTIONS.getOtherUser(username)),
        onFetchOtherUserPosts: username => dispatch(ACTIONS.fetchOtherUserPosts(username)),
        setProfile: (profile) => dispatch(ACTIONS.setOtherUserProfile(profile)),
        setPosts: posts => dispatch(ACTIONS.setOtherUserPosts(posts)),
    };
};

User.propTypes = {
    profile: PropTypes.object,
    match: PropTypes.object,
    onGetOtherUser: PropTypes.func,
    onFetchOtherUserPosts: PropTypes.func,
    userPosts: PropTypes.array,
};

export default  connect(mapStateToProps, mapDispatchToProps)(User);