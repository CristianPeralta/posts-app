import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const Comment = ({comment, userId, edit, commentStyle}) => (
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

Comment.propTypes = {
    comment: PropTypes.object,
    userId: PropTypes.number,
    edit: PropTypes.func,
    commentStyle: PropTypes.string,
};

export default Comment;