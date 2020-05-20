import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Callback extends Component {
  state = {
    readyToredirect: false
  }
  componentDidMount() {
    if (this.props.location.hash) {
      this.props.auth.handleAuth(() => {
        this.setState({readyToredirect: true});
      });
    }
  }

  render() {
    let redirectCallback = <p>Callback</p>;
    if (this.state.readyToredirect) {
      redirectCallback = <Redirect to="/authcheck" />;
    }
    return (
      <div>
        {redirectCallback}
      </div>
    );
  }
}

export default Callback;