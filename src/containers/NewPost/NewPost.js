import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import * as ACTIONS from '../../store/actions/actions';
import PropTypes from 'prop-types';

class AddPost extends Component {
    state = {
        redirectToPosts: false
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            title: event.target.title.value,
            body: event.target.body.value,
            username: this.props.profile.username,
            uid: this.props.profile.uid,
        };
        this.props.onAddPost(data);
    }
    render() {
        return (
            <div>
                {this.props.added || this.state.redirectToPosts ? <Redirect to="/posts" /> : null}
                <div>
                    <form onSubmit={e => this.handleSubmit(e)}>
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
                    <button onClick={() => this.setState({redirectToPosts: true})} >Cancel</button>
                </div>
            </div>
        );
    }
}

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

AddPost.propTypes = {
    profile: PropTypes.object,
    onAddPost: PropTypes.func,
    added: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);