import React, { Component } from 'react';
import * as ACTIONS from '../../store/actions/actions';
import history from '../../utils/history';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText
} from '@material-ui/core';

const RenderComments = ({comment, userId, edit}) => (
    <div>
        <h3>{comment.comment}</h3>
        <small>{comment.date_created}</small>
        <p>By: {comment.author} </p>
        {
            comment.user_id === userId
            ?   <Button onClick={() => edit(comment.cid, comment.comment)} >
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
            cid: '',
            opacity: 0,
            commentsArr: []
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        console.log('this.props.location.state.post', this.props.location.state.post)
        axios.get('/posts/comments', { params: { pid: this.props.location.state.post.pid }})
            .then(resp => this.props.setComments(resp.data))
            .catch(err => console.log(err))
    }

    handleTransition() {
        setTimeout(() => this.setState({opacity: 1}), 400);
    }

    addCommentsToState(comments) {
        this.setState({commentsArr: [...comments]});
    }

    animateComments() {
        let i = 0;
        this.state.commentsArr.forEach(comment => {
            setTimeout(() => this.setState({commentsMotion: [...this.state.commentsMotion, comment] }), 400*i)
            i++;
        });
    }

    handleClickOpen(cid, comment) {
        this.setState({ open: true, comment: comment, cid: cid });
    }
    handleClose() {
        this.setState({ open: false, comment: '', cid: '' });
    }
    handleCommentChange(event) {
        this.setState({ comment: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            comment: event.target.comment.value,
            postId: this.props.location.state.post.pid,
            userId: this.props.profile.uid,
            username: this.props.profile.username,
        };

        axios.post('/posts/comments', data)
            .then(res => this.props.setComments(res.data))
            .catch(err => console.log(err))
            .then(setTimeout(() => history.replace('/posts'), 700));
    }
    handleUpdate() {
        const data = {
            comment: this.state.comment,
            cid: this.state.cid,
            postId: this.props.location.state.post.pid,
            userId: this.props.profile.uid,
            username: this.props.profile.username,
        };

        axios.put('/posts/comments', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .then(setTimeout(() => history.replace('/posts'), 700));
    }
    handleDeleteComment() {
        const cid = this.state.cid;
        axios.delete('/posts/comments', { data: { cid: cid }})
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .then(setTimeout(() => history.replace('/posts'), 700));
    }
    render() {
        return (
            <div>
                <div>
                    <h2>Post</h2>
                    <h4>{this.props.location.state.post.title}</h4>
                    <p>{this.props.location.state.post.body}</p>
                    <p>{this.props.location.state.post.author}</p>
                </div>
                <div>
                    <h2>Comments</h2>
                    {this.props.comments
                    ? this.props.comments.map(comment => (
                        <RenderComments
                            key={comment.cid}
                            comment={comment}
                            edit={this.handleClickOpen}
                            userId={this.props.profile.uid} />
                        )) : null
                    }
                </div>
                <div>
                    <form onSubmit={e => this.handleSubmit(e)} >
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
                    >
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
                    </Dialog>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        comments: state.post.comments,
        profile: state.auth.dbProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setComments: comments => dispatch(ACTIONS.fetchPostComments(comments))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);