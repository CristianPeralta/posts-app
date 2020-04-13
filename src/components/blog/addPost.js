import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import history from '../../utils/history';

class AddPost extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            title: event.target.title.value,
            body: event.target.body.value,
            username: this.props.profile.username,
            uid: this.props.profile.uid,
        };
        console.log("handle submit", data);
        axios.post('/posts', data)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            .then(setTimeout(() => history.replace('/posts'), 700));
    }
    render() {
        return (
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
                    <button onClick={() => history.replace('/posts')} >Cancel</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.auth.dbProfile,
    };
};

export default connect(mapStateToProps)(AddPost);