import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../../store/actions/actions';

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

const mapStateToProps = state => {
    return {
        profile: state.user.profile
    };
};


const mapDispatchToProps = dispatch => {
    return {
        setProfile: (profile) => dispatch(ACTIONS.setUserProfile(profile))
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(ShowUser);