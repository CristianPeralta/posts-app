/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import * as ACTIONS from '../../store/actions/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../axios';
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
            opacity: 1,
            commentsArr: [],
            commentsMotion: [],
            likes: this.props.location.state.post.likes,
            like_user_id: this.props.location.state.post.like_user_id,
            like_post: true
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.props.onFetchPostComments({ pid: this.props.location.state.post.pid });
    }

    handleTransition() {
        setTimeout(() => this.setState({opacity: 1}), 400);
    }

    handleCommentSubmit(submitedComment) {
        setTimeout(() => this.setState({commentsMotion: [submitedComment, ...this.state.commentsMotion]}), 50);
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

        this.props.onAddPostComment(data);

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

        this.props.onEditPostComment(data);
    }
    handleDelete() {
        const cid = this.state.cid;
        this.props.onDeletePostComment(cid);
        //this.handleCommentDelete(cid);
    }
    handleLikes() {
        const data = {
            uid: this.props.profile.uid,
            postId: this.props.location.state.post.pid,
        };
        axios.put("/posts/likes", data)
            .then(!this.state.like_user_id.includes(data.like_user_id) && this.state.like_post
                ? this.setState({likes: this.state.likes + 1})
                : null
            )
            .then(this.setState({like_post: false}))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <div>
                    <h2>Post</h2>
                    <h4>{this.props.location.state.post.title}</h4>
                    <p>{this.props.location.state.post.body}</p>
                    <p>{this.props.location.state.post.author}</p>
                    <a style={{cursor: "pointer"}} onClick={this.props.isAuthenticated
                        ? () => this.handleLikes()
                        : () => this.props.history.replace("/signup")
                    }>
                        <i className="material-icons">thumb_up</i>
                        <small className="notification-num-showpost">{this.state.likes}</small>
                    </a>
                </div>
                <div style={{opacity: this.state.opacity, transition: 'ease-out 2s' }} >
                    <h2>Comments</h2>
                    {this.props.comments
                    ? this.props.comments.map(comment => (
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
                        {this.props.isAuthenticated
                            ? <Button type='submit'>Submit</Button>
                            : <Link to='/signup'>
                                <Button color='primary' variant='contained' >
                                    Signup to Comment
                                </Button>
                              </Link>
                        }
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
        profile: state.auth.dbProfile,
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPostComments: params => dispatch(ACTIONS.fetchPostComments(params)),
        onAddPostComment: (data) => dispatch(ACTIONS.addPostComment(data)),
        onEditPostComment: data => dispatch(ACTIONS.editPostComment(data)),
        onDeletePostComment: cid => dispatch(ACTIONS.deletePostComment(cid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);