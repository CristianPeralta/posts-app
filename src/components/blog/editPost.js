import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TextField
} from '@material-ui/core';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: ''
        };
    }
    componentDidMount() {
        this.setState({
            title: this.props.post.title,
            body: this.props.post.body
        });
    }

    handleTitleChange = event => {
        this.setState({ title: event.target.value });
    }

    handleBodyChange = event => {
        this.setState({ body: event.target.value });
    }

    render() {
        return (
            <div>
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
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.auth.profile
    };
};

export default connect(mapStateToProps)(EditPost);