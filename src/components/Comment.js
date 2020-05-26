/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
    Button,
} from '@material-ui/core';

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

export default Comment;