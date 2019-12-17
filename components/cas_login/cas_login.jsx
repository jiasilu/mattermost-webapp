// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {Client4} from 'mattermost-redux/client/index';

const client_1 = require('mattermost-redux/client');

export default class CasLogin extends React.Component {
    static get propTypes() {
        return {
            location: PropTypes.object.isRequired,
        };
    }

    constructor(props) {
        super(props);

        this.state = {};
        this.loginWithCasAuthentication();
    }

    loginWithCasAuthentication = () => {
        const CasLoginApi = client_1.Client4.getUsersRoute() + '/cas_login';
        // const xhr = new XMLHttpRequest();
        //
        // xhr.addEventListener('load', () => {
        //     console.log(xhr.responseText);
        // });
        // xhr.open('GET', CasLoginApi);
        // xhr.send();
        window.location.replace(CasLoginApi);
    };

    render() {
        return null;
    }
}
