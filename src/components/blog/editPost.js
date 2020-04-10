import React, { Component } from 'react';
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
    render() {
        return (
            <div>
                <form>
                    <TextField
                        id='title'
                        label='Title'
                        margin='normal'
                    />
                    <TextField
                        id='body'
                        label='Body'
                        multiline
                        rows='4'
                        margin='normal'
                    />
                </form>
            </div>
        );
    }
}

export default EditPost;