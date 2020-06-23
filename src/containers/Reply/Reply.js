import React, { Component } from 'react';
import NewMessage from '../../containers/NewMessage/NewMessage';
import PropTypes from 'prop-types';

class ReplyToMessage extends Component {
    render() {
        let message = <p>Loading...</p>
        if (this.props.location.state.props.message) {
            message = this.props.location.state.props.message;
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
    }
}

ReplyToMessage.propTypes = {
    location: PropTypes.object,
};

export default ReplyToMessage;