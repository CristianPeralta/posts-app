import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as ACTIONS from '../store/actions/actions';
import history from '../utils/history';
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
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      postId: ''
    }
  }
  componentDidMount() {
    const userId = this.props.dbProfile.uid;
    axios.get('/posts/user', { params: { userId: userId }})
      .then(res => this.props.setUserPosts(res.data))
      .catch(err => console.log(err));
  }
  RenderProfile = (props) => (
    <div>
      <h1>{props.profile.nickname}</h1>
      <br />
      <img src={props.profile.picture} alt="" />
      <br />
      <h4> {props.profile.email}</h4>
      <br />
      <h5> {props.profile.name} </h5>
      <br />
      <h6> Email Verified: </h6>
      {props.profile.emailVerified ? <p>Yes</p> : <p>No</p> }
      <br />
    </div>
  )

  RenderPost = ({post}) => (
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
                <Link to={{ pathname: '/editpost/' + post.pid, state: {post}}}>
                  <button>
                    Edit
                  </button>
                </Link>
                <button onClick={() => this.handleClickOpen(post.pid)} >
                  Delete
                </button>
              </div>
            </div>
          }
        />
        <br />
        <CardContent>
          <span style={{overflow: 'hidden'}}>{post.body}</span>
        </CardContent>
    </Card>
  )

  DeletePost = () => {
    const postId = this.state.postId;
    axios.delete('/posts/comments', { data: { postId: postId }})
      .then(() => axios.delete('/post', { data: { postId: postId }}
        .then(res => console.log(res))))
      .catch(err => console.log(err))
      .then(() => this.handleClickClose())
      .then(() => setTimeout(() => history.replace('/'), 700));
  }

  handleClickOpen = pid => {
    this.setState({ open: true, postId: pid });
  }

  handleClickClose = () => {
    this.setState({ open: false, postId: null });
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
          onClose={this.handleClickClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Edit Comment</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Deleting Post
            </DialogContentText>
            <DialogActions>
              <Button onClick={() => this.DeletePost()}>
                Agree
              </Button>
              <Button onClick={() => this.handleClickClose()}>
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
    dbProfile: state.auth.dbProfile,
    userPosts: state.post.userPosts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserPosts: posts => dispatch(ACTIONS.fetchUserPosts(posts))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);