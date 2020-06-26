import React from 'react';
import NewMessage from '../../containers/NewMessage/NewMessage';
import PropTypes from 'prop-types';

const Reply = props => {
  let message = <p>Loading...</p>
  if (props.location.state.props.message) {
      message = props.location.state.props.message;
  }
  return (
      <div>
          <h2>Message:</h2>
          <div className='FlexColumn'>
              <div>
                  <p>{ message.message_title }</p>
              </div>
              <div>
                  <p>{ message.message_body }</p>
              </div>
              <div>
                  <p>By: { message.message_sender }</p>
              </div>
          </div>
          <NewMessage location={{
              state: {
                  props: {
                      profile: {
                          username: message.message_sender
                      }
                  }
              }
          }}/>
      </div>
  );
};

Reply.propTypes = {
    location: PropTypes.object,
};

export default Reply;
