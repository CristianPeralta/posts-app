import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import * as ACTIONS from '../../store/actions/actions';
import PropTypes from 'prop-types';

const NewPost = props => {
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
          title: event.target.title.value,
          body: event.target.body.value,
          username: props.profile.username,
          uid: props.profile.uid,
      };
      props.onAddPost(data);
  };
  return (
    <div>
        {props.added || redirect ? <Redirect to="/posts" /> : null}
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <TextField
                    id='title'
                    label='Title'
                    margin='normal'
                />
                <br />
                <TextField
                    id='body'
                    label='Body'
                    multiline
                    rows='4'
                    margin='normal'
                />
                <br />
                <button type='submit' >Submit</button>
            </form>
                <br />
            <button onClick={() => setRedirect(true)} >Cancel</button>
        </div>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        profile: state.auth.dbProfile,
        added: state.post.added,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: data => dispatch(ACTIONS.addPost(data)),
    };
};

NewPost.propTypes = {
    profile: PropTypes.object,
    onAddPost: PropTypes.func,
    added: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
