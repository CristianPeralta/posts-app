import React, { Component } from 'react';

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
            </div>
        );
    }
}

export default ReplyToMessage;