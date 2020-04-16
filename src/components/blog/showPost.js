import React, { Component } from 'react';
import * as ACTIONS from '../../store/actions/actions';
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

const RenderComments = ({comment, userId, edit, commentStyle}) => (
    <div className={commentStyle}  >
        <h3>{comment.comment}</h3>
        <small>{comment.date_created === "Just Now"
            ? <div>
                { comment.isEdited
                    ? <span> Edited </span>
                    : <span> Just Now </span>
                }
            </div>
            : comment.date_created
        }</small>
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
            commentsArr: [],
            commentsMotion: []
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        console.log('this.props.location.state.post', this.props.location.state.post)
        axios.get('/posts/comments', { params: { pid: this.props.location.state.post.pid }})
            .then(resp => this.props.setComments(resp.data))
            .then(() => this.addCommentsToState(this.props.comments))
            .catch(err => console.log(err))
        this.handleTransition();
    }

    handleTransition() {
        setTimeout(() => this.setState({opacity: 1}), 400);
    }

    addCommentsToState(comments) {
        this.setState({commentsArr: [...comments]});
        this.animateComments();
    }

    animateComments() {
        let i = 1;
        this.state.commentsArr.forEach(comment => {
            setTimeout(() => this.setState({commentsMotion: [...this.state.commentsMotion, comment] }), 400*i)
            i++;
        });
    }

    handleCommentSubmit(submitedComment) {
        setTimeout(() => this.setState({commentsMotion: [submitedComment, ...this.state.commentsMotion]}), 50);
    }

    handleCommentUpdate(comment) {
        let commentIndex = this.state.commentsMotion.findIndex(c => c.cid === comment.cid);
        let newArr = [...this.state.commentsMotion];
        newArr[commentIndex] = comment;
        this.setState({commentsMotion: newArr});
    }

    handleCommentDelete(cid) {
        this.setState({ deleteCommentId: cid});
        const newArr = this.state.commentsMotion.filter(c => c.cid !== cid);
        setTimeout(() => this.setState({commentsMotion: newArr}), 2000);
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
        const tempCid = 154424;
        const justNow = 'Just Now';
        const submitedComment = {
            cid: tempCid,
            comment: data.comment,
            post_id: data.postId,
            user_id: data.userId,
            author: data.username,
            date_created: justNow
        };

        axios.post('/posts/comments', data)
            .then(res => this.props.setComments(res.data))
            .catch(err => console.log(err))

        window.scroll({top: 0, left: 0, behavior: 'smooth'});
        this.handleCommentSubmit(submitedComment);
    }
    handleUpdate() {
        this.setState({comment: ''});
        const data = {
            cid: this.state.cid,
            comment: this.state.comment,
            postId: this.props.location.state.post.pid,
            userId: this.props.profile.uid,
            username: this.props.profile.username,
        };

        const edittedComment = {
            cid: data.cid,
            comment: data.comment,
            post_id: data.postId,
            user_id: data.userId,
            author: data.username,
            date_created: 'Just Now',
            isEdited: true
        };

        axios.put('/posts/comments', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        this.handleCommentUpdate(edittedComment);
    }
    handleDelete() {
        const cid = this.state.cid;
        axios.delete('/posts/comment', { data: { cid: cid }})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        this.handleCommentDelete(cid);   
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
                <div style={{opacity: this.state.opacity, transition: 'ease-out 2s' }} >
                    <h2>Comments</h2>
                    {this.props.comments
                    ? this.state.commentsMotion.map(comment => (
                        <RenderComments
                            key={comment.cid}
                            comment={comment}
                            edit={this.handleClickOpen}
                            userId={this.props.profile.uid}
                            commentStyle={this.state.deleteCommentId === comment.cid
                                ? "FadeOutComment"
                                : "CommentStyles"
                            }
                            />
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
                                <Button onClick={() => {
                                    this.handleDelete();
                                    this.setState({ open: false });
                                }} >
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