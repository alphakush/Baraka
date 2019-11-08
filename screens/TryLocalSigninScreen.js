import React from 'react';

import LocalSign from '../components/LocalSign';

const tryLocalSigninScreen = props => {
    return (
        <LocalSign navigation={props.navigation} />
    );
};

export default tryLocalSigninScreen;