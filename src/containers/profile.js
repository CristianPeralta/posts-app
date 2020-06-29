import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTIONS from '../store/actions/actions';
import { Redirect } from 'react-router-dom';
import '../App.css';
import Post from '../components/Post';
import ModalDialog from '../components/UI/ModalDialog';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const Profile = props => {
  const [redirectToHome] = useState(false);
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState('');

  const loadPosts = useCallback((userId) => {
    props.onFetchUserPosts({ userId: userId });
  }, [props.onFetchUserPosts, props.dbProfile]);

  useEffect(() => {
    if (props.dbProfile) {
      const userId = props.dbProfile.uid;
      loadPosts(userId);
    }
  }, [props.dbProfile]);

  const RenderProfile = (props) => (
    <div>
      <h1>{props.profile.nickname}</h1>
      <br />
      <img src={props.profile.picture} alt="" />
      <br />
      <h4> {props.profile.email}</h4>
      <br />
      <h5> {props.profile.name} </h5>
      <br />
      <h6> Email Verified: </h6>
      {props.profile.emailVerified ? <p>Yes</p> : <p>No</p> }
      <br />
    </div>
  );

  const deletePost = () => {
    props.onDeletePost(postId);
    handleClickClose();
  };

  const handleClickOpen = pid => {
    setOpen(true);
    setPostId(pid);
  };

  const handleClickClose = () => {
    setOpen(false);
    setPostId(null);
  };

  return(
    <div>
      {redirectToHome ? <Redirect to='/' /> : null}
      <div>
        {props.dbProfile ? <RenderProfile profile={props.profile} /> : <p>Loading</p>}
      </div>
      <div>
        {
          props.dbProfile ? <Link to={{pathname: '/messages/' + props.dbProfile.uid}}>
          <Button variant='contained' color='primary' type='submit'>
              Show Messages
          </Button>
        </Link>
        : <p>Loading</p>
        }
      </div>
      {}
      <div>
        {
          props.userPosts ?
            props.userPosts.map(post => (
              <Post post={post} key={post.pid} showAuthor={false} >
                <div className='FlexRow'>
                  <Link to={{ pathname: '/posts/' + post.pid + '/edit'}}>
                    <button>
                      Edit
                    </button>
                  </Link>
                  <button onClick={() => handleClickOpen(post.pid)} >
                    Delete
                  </button>
                </div>
              </Post> )) : null
        }
      </div>
      <ModalDialog
        title="Delete Post"
        open={open}
        close={handleClickClose}
        agreeAction={deletePost}
        cancelAction={handleClickClose}
      >
        Deleting Post
      </ModalDialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.auth.profile,
    dbProfile: state.auth.dbProfile,
    userPosts: state.post.posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserPosts: query => dispatch(ACTIONS.fetchPosts(query)),
    onDeletePost: pid => dispatch(ACTIONS.deletePost(pid)),
  };
};

Profile.propTypes = {
  dbProfile: PropTypes.object,
  onFetchUserPosts: PropTypes.func,
  userPosts: PropTypes.array,
  onDeletePost: PropTypes.func,
  profile: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
