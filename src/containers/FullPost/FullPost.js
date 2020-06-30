import React, { useState, useEffect } from 'react';
import * as ACTIONS from '../../store/actions/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import ModalDialog from '../../components/UI/ModalDialog';
import { getPost } from '../../api';
import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const FullPost = props => {
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [cid, setCid] = useState('');
    const [opacity] = useState(1);

    useEffect(() => {
        getPost(props.match.params.pid)
            .then(post => setPost(post))
            .then(() => props.onFetchPostComments({ pid: props.match.params.pid }))
            .catch(error => console.log(error));
    }, []);

    const handleClickOpen = (cid, comment) => {
        setOpen(true);
        setComment(comment);
        setCid(cid);
    };

    const handleClose = () => {
        setOpen(false);
        setComment('');
        setCid('');
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            comment: event.target.comment.value,
            postId: post.pid,
            userId: props.profile.uid,
            username: props.profile.username,
        };

        props.onAddPostComment(data);

        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    };

    const handleUpdate = () => {
        setComment('');
        const data = {
            cid: cid,
            comment: comment,
            postId: post.pid,
            userId: props.profile.uid,
            username: props.profile.username,
        };

        props.onEditPostComment(data);
    };

    const handleDelete = () => {
        props.onDeletePostComment(cid);
    };

    const handleLikes = (pid) => {
        const data = {
            uid: props.profile.uid,
            postId: pid,
        };
        props.onAddPostLike(data);
    };

    let renderPost = <p>Loading</p>;
    if (post) {
        renderPost = <Post
            key={post.pid}
            post={post}
            showAuthor
            isAuthenticated={props.isAuthenticated}
            history={props.history}
            profile={props.profile}
            onAddPostLike={props.onAddPostLike}
            onHandleLikes={handleLikes}
        />;
    }
    return (
        <div>
            {renderPost}
            <div style={{opacity: opacity, transition: 'ease-out 2s' }} >
                <h2>Comments</h2>
                {props.comments
                ? props.comments.map(comment => (
                    <Comment
                        key={comment.cid}
                        comment={comment}
                        edit={handleClickOpen}
                        userId={props.profile ? props.profile.uid : null}
                        commentStyle={cid === comment.cid
                            ? "FadeOutComment"
                            : "CommentStyles"
                        }
                        />
                    )) : null
                }
            </div>
            <div>
                <form onSubmit={e => handleSubmit(e)} >
                    <TextField
                        id='comment'
                        label='Comment'
                        margin='normal'
                    />
                    <br />
                    {props.isAuthenticated
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
            <ModalDialog
                title="Edit Comment"
                open={open}
                close={handleClose}
                agreeAction={() => {
                    handleUpdate();
                    setOpen(false);
                }}
                cancelAction={handleClose}
                deleteAction={() => {
                    handleDelete();
                    setOpen(false);
                }}
            >
                <input type='text' value={comment} onChange={handleCommentChange} />
            </ModalDialog>
            </div>
        </div>
    );
};

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
        onAddPostLike: data => dispatch(ACTIONS.addPostLike(data)),
    };
};

FullPost.propTypes = {
    isAuthenticated: PropTypes.bool,
    profile: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    comments: PropTypes.array,
    onFetchPostComments: PropTypes.func,
    onAddPostLike: PropTypes.func,
    onAddPostComment: PropTypes.func,
    onEditPostComment: PropTypes.func,
    onDeletePostComment: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);
