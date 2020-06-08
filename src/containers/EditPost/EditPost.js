import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPost } from '../../api';
import {
    TextField
} from '@material-ui/core';
import * as ACTIONS from '../../store/actions/actions';

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
        this.setState({
            title: this.props.location.state.post.title,
            body: this.props.location.state.post.body
        });
    }

    handleTitleChange = event => {
        this.setState({ title: event.target.value });
    }

    handleBodyChange = event => {
        this.setState({ body: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            title: event.target.title.value,
            body: event.target.body.value,
            pid: this.props.location.state.post.pid,
            uid: this.props.profile.uid,
            username: this.props.profile.username,
        };

        this.props.onEditPost(data);
    }
    render() {
        return (
            <div>
                {this.props.edited ? <Redirect to='/profile' /> : null}
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id='title'
                        label='Title'
                        margin='normal'
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <TextField
                        id='body'
                        label='Body'
                        multiline
                        rows='4'
                        margin='normal'
                        value={this.state.body}
                        onChange={this.handleBodyChange}
                    />
                    <br />
                    <button type="submit"> Submit </button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);