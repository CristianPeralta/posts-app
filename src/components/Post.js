/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    Card,
    CardContent,
    CardHeader,
} from '@material-ui/core';

const Post = ({post, profile, showAuthor, isAuthenticated, history, onAddPostLike, children}) => {
    const handleLikes = () => {
        const data = {
            uid: profile.uid,
            postId: post.pid,
        };
        onAddPostLike(data);
    };
    return (
        <div className="CardStyles">
            <Card style={{width:'500px', height: '200px', marginBottom: '10px', paddingBottom: '80px'}}>
                <CardHeader
                title={<Link to={{ pathname: '/posts/' + post.pid, state: {post} }} >
                        {post.title}
                        </Link>}
                subheader={
                    <div className='FlexColumn'>
                        <div className='FlexRow'>
                            {moment(post.date_created).format('MMMM Do, YYYY | h:mm:ss a')}
                        </div>
                        {showAuthor ? <div className='FlexRow'>
                            <Link style={{paddingLeft: '5ps', textDecoration: 'none'}}
                                to={{pathname: '/user/' + post.author, state:{post}}}>
                                By: {post.author}
                            </Link>
                        </div> : null}
                        <div className="FlexRow">
                            <a style={{cursor: "pointer"}} onClick={isAuthenticated
                                ? () => handleLikes()
                                : () => history.replace("/signup")
                            }>
                                <i className="material-icons">thumb_up</i>
                                <small className="notification-num">{post.likes}</small>
                            </a>
                        </div>
                        <br />
                        {children}
                    </div>
                }
                />
                <br />
                <CardContent>
                <span style={{overflow: 'hidden'}}>{post.body}</span>
                </CardContent>
            </Card>
        </div>
    );
};

export default Post;