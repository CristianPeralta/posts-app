import React, { Component } from 'react';

const RenderProfile = props => {
    return (
        <div className='FlexRow'>
            <h1>
                {props.profile.username}
            </h1>
        </div>
    );
};

class ShowUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile : null
        }
    }
    render() {
        return (
            <div>
                <RenderProfile profile={this.state.profile} />
            </div>
        );
    }
}

export default ShowUser;