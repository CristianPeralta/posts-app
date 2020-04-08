import React, {Component} from 'react';
import { TextField } from '@material-ui/core';

class AddPost extends Component {
    handleSubmit() {
        console.log("handle submit");
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

export default AddPost;