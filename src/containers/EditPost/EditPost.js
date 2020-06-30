import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPost } from '../../api';
import { TextField } from '@material-ui/core';
import * as ACTIONS from '../../store/actions/actions';
import PropTypes from 'prop-types';

const EditPost = props => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(props.match.params.pid)
      .then(post => setPost(post))
      .catch(error => console.log(error));
  }, []);

  const handleTitleChange = event => {
    const newTitle = event.target.value;
    setPost((preventState) => ({
      ...preventState,
      title: newTitle,
    }));
  };

  const handleBodyChange = event => {
    const newBody = event.target.value;
    setPost((preventState) => ({
      ...preventState,
      body: newBody,
    }));
  };

  const handleSubmit = event => {
      event.preventDefault();

      const data = {
          title: event.target.title.value,
          body: event.target.body.value,
          pid: post.pid,
          uid: props.profile.uid,
          username: props.profile.username,
      };

      props.onEditPost(data);
  };

  let form  = <p>Loading...</p>;
  if (post) {
      form = (
          <form onSubmit={handleSubmit}>
              <TextField
                  id='title'
                  label='Title'
                  margin='normal'
                  value={post.title}
                  onChange={handleTitleChange}
              />
              <TextField
                  id='body'
                  label='Body'
                  multiline
                  rows='4'
                  margin='normal'
                  value={post.body}
                  onChange={handleBodyChange}
              />
              <br />
              <button type="submit"> Submit </button>
          </form>
      );
  }
  return (
      <div>
          {props.edited ? <Redirect to='/profile' /> : null}
          {form}
          <br />
          <button onClick={() => props.history.goBack()}> Cancel </button>
      </div>
  );
};

const mapStateToProps = state => {
    return {
        profile: state.auth.dbProfile,
        edited: state.post.edited,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEditPost: data => dispatch(ACTIONS.editPost(data)),
    };
};

EditPost.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    edited: PropTypes.bool,
    profile: PropTypes.object,
    onEditPost: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
