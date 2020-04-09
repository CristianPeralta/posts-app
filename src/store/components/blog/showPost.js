import React, { Component } from 'react';

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
                    {this.props.comments}
                </div>
            </div>
        );
    }
}

export default ShowPost;