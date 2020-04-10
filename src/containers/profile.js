import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader
} from '@material-ui/core';

class Profile extends Component {
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
            </div>
          }
        >
        </CardHeader>
    </Card>
  )

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

export default connect(mapStateToProps)(Profile);