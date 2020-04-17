import React from 'react';
import { Button } from '@material-ui/core';

const SignUp = props => (
    <div>
        <h1>
            SignUp and Create and Account
        </h1>
        <Button coloe='primary' size='large' variant='contained' onClick={() => props.auth.login()}>
            Signup
        </Button>
    </div>
);

export default SignUp;