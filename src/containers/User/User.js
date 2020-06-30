import React, { useEffect } from 'react';
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

const User = props => {
  useEffect(() => {
    const username = props.match.params.username;
    props.onGetOtherUser(username);
    props.onFetchOtherUserPosts(username);
    window.scrollTo({ top: 0, left: 0});
  }, []);
  return (
    <div>
        {   props.profile
            ? <RenderProfile profile={props.profile} />
            : null
        }
        <div>
            <h2>Latest Activity: </h2>
                <div>
                    {props.userPosts
                        ? props.userPosts.map(post =>
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
};

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
