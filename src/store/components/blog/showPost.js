import React, { Component } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

const RenderComments = (comment, userId) => (
    <div>
        <h3>{comment.comment}</h3>
        <small>{comment.date_created}</small>
        <p>By: {comment.author} </p>
        {
            comment.user_id === userId
            ?   <Button onClick={() => console.log('EDIT')} >
                Edit
            </Button> : null
        }
    </div>
);

class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            comment: '',
            cid: ''
        }
    }

    handleSubmit() {
        console.log('handle submit');
    }
    handleClose() {
        console.log('handle close');
    }
    render() {
        return (
            <div>
                <div>
                    <h2>Post</h2>
                    <h4>{this.props.post.title}</h4>
                    <p>{this.props.post.body}</p>
                    <p>{this.props.post.author}</p>
                </div>
                <div>
                    <h2>Comments</h2>
                    {this.props.comments
                    ? this.props.comments.map(comment => (
                        <RenderComments
                            key={comment.cid}
                            comment={comment}
                            userId={this.props.profile.uid} />
                        )) : null
                    }
                </div>
                <div>
                    <form onClick={this.handleSubmit} >
                        <TextField
                            id='comment'
                            label='Comment'
                            margin='normal'
                        />
                        <br />
                        <Button type='submit'>Submit</Button>
                    </form>
                </div>
                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'
                    />
                    <DialogTitle id='alert-dialog-title'>Edit Comment</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            <input type='text' value={this.state.comment} onChange={this.handleCommentChange} />
                        </DialogContentText>
                        <Button onClick={() => {
                            this.handleUpdate();
                            this.setState({ open: false });
                        }} >
                            Agree
                        </Button>
                    </DialogContent>
                </div>
            </div>
        );
    }
}

export default ShowPost;