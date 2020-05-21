import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    Card,
    CardContent,
    CardHeader,
} from '@material-ui/core';

const Post = ({post}) => {
    return (
        <div className="CardStyles">
            <Card style={{width:'500px', height: '200px', marginBottom: '10px', paddingBottom: '80px'}}>
                <CardHeader
                title={<Link to={{ pathname: '/post/' + post.pid, state: {post} }} >
                        {post.title}
                        </Link>}
                subheader={
                    <div className='FlexColumn'>
                        <div className='FlexRow'>
                            {moment(post.date_created).format('MMMM Do, YYYY | h:mm:ss a')}
                        </div>
                        <div className='FlexRow'>
                            <Link style={{paddingLeft: '5ps', textDecoration: 'none'}}
                                to={{pathname: '/user/' + post.author, state:{post}}}>
                                By: {post.author}
                            </Link>
                        </div>
                        <div className="FlexRow">
                            <i className="material-icons">thumb_up</i>
                            <div className="notification-num-posts">
                                {post.likes}
                            </div>
                        </div>
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