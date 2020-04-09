import React, { Component } from 'react';
import { Button } from '@material-ui/core';

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
            </div>
        );
    }
}

export default ShowPost;