import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTIONS from '../store/actions/actions';
import { Redirect } from 'react-router-dom';
import '../App.css';
import Post from '../components/Post';
import ModalDialog from '../components/UI/ModalDialog';
import { Button } from '@material-ui/core';

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
            this.props.dbProfile ? <Link to={{pathname: '/messages/' + this.props.dbProfile.uid}}>
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
                <Post post={post} key={post.pid} showAuthor={false} >
                  <div className='FlexRow'>
                    <Link to={{ pathname: '/posts/' + post.pid + '/edit'}}>
                      <button>
                        Edit
                      </button>
                    </Link>
                    <button onClick={() => this.handleClickOpen(post.pid)} >
                      Delete
                    </button>
                  </div>
                </Post> )) : null
          }
        </div>
        <ModalDialog
          title="Delete Post"
          open={this.state.open}
          close={this.handleClickClose}
          agreeAction={this.DeletePost}
          cancelAction={this.handleClickClose}
        >
          Deleting Post
        </ModalDialog>
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