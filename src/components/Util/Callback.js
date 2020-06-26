import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Callback = props => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (props.location.hash) {
      props.auth.handleAuth(() => {
        setRedirect({redirect: true});
      });
    }
  }, []);

  let redirectCallback = <p>Callback</p>;
  if (redirect) {
    redirectCallback = <Redirect to="/authcheck" />;
  }
  return (
    <div>
      {redirectCallback}
    </div>
  );
};

Callback.propTypes = {
  location: PropTypes.object,
  auth: PropTypes.object,
};

export default Callback;
