import React, { Component } from 'react';
import * as ACTIONS from '../../actions/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
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
            ?   <Button onClick={() => this.handleClickOpen(comment.cid, comment.comment)} >
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

    componentDidMount() {
        axios.get('/posts/comments', { params: { pid: this.props.post.pid }})
            .then(resp => this.setComments(resp.data))
            .catch(err => console.log(err))
    }

    handleSubmit() {
        console.log('handle submit');
    }
    handleClickOpen(cid, comment) {
        this.setState({ open: true, comment: comment, cid: cid });
    }
    handleClose() {
        console.log('handle close');
    }
    handleUpdate() {
        console.log('handle update');
    }
    handleCommentChange() {
        console.log('handle comment change');
    }
    handleDeleteComment() {
        console.log('handle delete comment');
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
                        <DialogActions>
                            <Button onClick={() => {
                                this.handleUpdate();
                                this.setState({ open: false });
                            }} >
                                Agree
                            </Button>
                            <Button onClick={() => this.handleClose() } >
                                Cancel
                            </Button>
                            <Button onClick={() => this.handleDeleteComment()} >
                                Delete
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        comments: state.posts.comments,
        profile: state.auth.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setComments: comments => dispatch(ACTIONS.fetchPostComments(comments))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);