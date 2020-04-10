import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <this.RenderProfile post={post} key={post.pid} /> )) : null
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