import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPost } from '../../api';
import { TextField } from '@material-ui/core';
import * as ACTIONS from '../../store/actions/actions';
import PropTypes from 'prop-types';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
            title: '',
            body: ''
        };
    }
    componentDidMount() {
        getPost(this.props.match.params.pid)
            .then(post => this.setState({ post: post }))
            .catch(error => console.log(error));
    }

    handleTitleChange = event => {
        this.setState({post: {
            ...this.state.post,
            title: event.target.value,
        }});
    }

    handleBodyChange = event => {
        this.setState({post: {
            ...this.state.post,
            body: event.target.value,
        }});
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            title: event.target.title.value,
            body: event.target.body.value,
            pid: this.state.post.pid,
            uid: this.props.profile.uid,
            username: this.props.profile.username,
        };

        this.props.onEditPost(data);
    }
    render() {
        let form  = <p>Loading...</p>;
        if (this.state.post) {
            form = (
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id='title'
                        label='Title'
                        margin='normal'
                        value={this.state.post.title}
                        onChange={this.handleTitleChange}
                    />
                    <TextField
                        id='body'
                        label='Body'
                        multiline
                        rows='4'
                        margin='normal'
                        value={this.state.post.body}
                        onChange={this.handleBodyChange}
                    />
                    <br />
                    <button type="submit"> Submit </button>
                </form>
            );
        }
        return (
            <div>
                {this.props.edited ? <Redirect to='/profile' /> : null}
                {form}
                <br />
                <button onClick={() => this.props.history.goBack()}> Cancel </button>
            </div>
        );
    }
}

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