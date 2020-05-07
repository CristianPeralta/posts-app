import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    TextField
} from '@material-ui/core';
import axios from '../../axios';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToProfile: false,
            title: '',
            body: ''
        };
    }
    componentDidMount() {
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

        axios.put('/posts', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
            .then(() => {
                this.setState({ redirectToProfile: true });
            });
    }
    render() {
        return (
            <div>
                {this.state.redirectToProfile ? <Redirect to='/profile' /> : null}
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
        profile: state.auth.dbProfile
    };
};

export default connect(mapStateToProps)(EditPost);