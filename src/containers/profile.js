import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTIONS from '../store/actions/actions';
import { Redirect } from 'react-router-dom';
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
      redirectToHome: false,
      open: false,
      postId: ''
    }
  }
  componentDidMount() {
    if (this.props.dbProfile) {
      this.loadPosts();
    }
  }

  loadPosts = () => {
    const userId = this.props.dbProfile.uid;
    this.props.onFetchUserPosts({ userId: userId });
  }
  shouldComponentUpdate(nextProps, nextStates) {
    const shouldUpdate = (nextProps.dbProfile && !this.props.dbProfile) 
      || !(nextProps.dbProfile && this.props.dbProfile && nextProps.dbProfile.uid === this.props.dbProfile.uid
      && nextProps.userPosts.length === this.props.userPosts.length);
    return shouldUpdate || JSON.stringify(this.state) !== JSON.stringify(nextStates);
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
    this.props.onDeletePost(postId);
    this.handleClickClose();
  }

  handleClickOpen = pid => {
    console.log('handleClickOpen');
    this.setState({ open: true, postId: pid });
    console.log('open', this.state.open, this.state.postId);
  }

  handleClickClose = () => {
    this.setState({ open: false, postId: null });
  }
  render() {
    return(
      <div>
        {this.state.redirectToHome ? <Redirect to='/' /> : null}
        <div>
          {this.props.dbProfile ? <this.RenderProfile profile={this.props.profile} /> : <p>Loading</p>} 
        </div>
        <div>
          {
            this.props.dbProfile ? <Link to={{pathname: '/show-messages/' + this.props.dbProfile.uid}}>
            <Button variant='contained' color='primary' type='submit'>
                Show Messages
            </Button>
          </Link>
          : <p>Loading</p>
          }
        </div>
        {this.props.dbProfile ? this.loadPosts() : null}
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
    userPosts: state.post.posts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserPosts: query => dispatch(ACTIONS.fetchPosts(query)),
    onDeletePost: pid => dispatch(ACTIONS.deletePost(pid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);