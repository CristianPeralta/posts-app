import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import axios from 'axios';

class AddPost extends Component {
    handleSubmit(event) {
        event.prevenDefault();
        const data = {
            title: event.target.title.value,
            body: event.target.body.value,
            username: this.props.profile[0].name,
            uid: this.props.profile[0].uid,
        };
        console.log("handle submit", data);
        axios.post('/post', data)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.auth.profile,
    };
};

export default connect(mapStateToProps)(AddPost);