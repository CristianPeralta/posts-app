import React, { Component } from 'react';
import { connect } from 'react-redux';

class Posts extends Component {
    render() {
        return (
            <div>
                POSTS
            </div>
        );
    }
}

export default connect()(Posts);