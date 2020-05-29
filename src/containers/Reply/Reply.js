import React, { Component } from 'react';
import NewMessage from '../../containers/NewMessage/NewMessage';

class ReplyToMessage extends Component {
    render() {
        return (
            <div>
                <h2>Message:</h2>
                <div className='FlexColumn'>
                    <div>
                        <p>{ this.props.location.state.props.message.message_title }</p>
                    </div>
                    <div>
                        <p>{ this.props.location.state.props.message.message_body }</p>
                    </div>
                    <div>
                        <p>By: {this.props.location.state.props.message.message_sender}</p>
                    </div>
                </div>
                <NewMessage location={{
                    state: {
                        props: {
                            profile: {
                                username: this.props.location.state.props.message.message_sender
                            }
                        }
                    }
                }}/>
            </div>
        );
    }
}

export default ReplyToMessage;