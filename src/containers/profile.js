import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as ACTIONS from '../store/actions/actions';
import '../App.css';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';

class Profile extends Component {
  componentDidMount() {
    const userId = this.props.profile[0].uid;
    axios.get('/posts', { params: { userId: userId }})
      .then(res => this.props.setUserPosts(res.data))
      .catch(err => console.log(err));
  }
  RenderProfile = (props) => (
    <div>
      <h1>{props.profile.profile.nickname}</h1>
      <br />
      <img src={props.profile.profile.picture} alt="" />
      <br />
      <h4> {props.profile.profile.email}</h4>
      <br />
      <h5> {props.profile.profile.name} </h5>
      <br />
      <h6> Email Verified: </h6>
      {props.profile.profile.emailVerified ? <p>Yes</p> : <p>No</p> }
      <br />
    </div>
  )

  RenderPost = post => (
    <Card style={{width:'500px', height: '200px', marginBottom: '10px', paddingBottom: '80px'}}>
        <CardHeader
          title={<Link to={{ pathname: '/post/' + post.pid, state: {post} }} >
                  {post.title}
                 </Link>}
          subheader={
            <div className='FlexColumn'>
              <div className='FlexRow'>
                {post.date_created}
              </div>
              <div className='FlexRow'>
                <Link to={{ pathname: 'editpost' + post.pid, state: {post}}}>
                  <button>
                    Edit
                  </button>
                </Link>
                <button onClick={() => this.setState({open: true, postId: post.pid})} >
                  Delete
                </button>
              </div>
            </div>
          }
        >
        <br />
        <CardContent>
          <span style={{overflow: 'hidden'}}>{post.body}</span>
        </CardContent>
        </CardHeader>
    </Card>
  )

  DeletePost = () => {
    const postId = this.state.postId;
    axios.delete('/posts/comments', { data: { postId: postId }})
      .then(() => axios.delete('/post', { data: { postId: postId }}
        .then(res => console.log(res))))
      .catch(err => console.log(err))
      .then(() => this.handleClose())
  }

  render() {
    return(
      <div>
        <div>
          <this.RenderProfile profile={this.props.profile} />
        </div>
        <div>
          {
            this.props.userPosts ?
              this.props.userPosts.map(post => (
                <this.RenderPost post={post} key={post.pid} /> )) : null
          }
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
        </Dialog>
        <DialogTitle id='alert-dialog-title'>Edit Comment</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Deleting Post
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => {this.handleUpdate(); this.setState({open: false})}} >
              Agree
            </Button>
            <Button onClick={() => this.handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
    userPosts: state.post.userPosts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserPosts: posts => dispatch(ACTIONS.setUserPosts(posts))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);