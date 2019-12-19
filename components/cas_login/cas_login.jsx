// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import queryString from 'query-string';
import axios from 'axios';

const Client1 = require('mattermost-redux/client');
const ServiceURL = window.location.protocol + '//' + window.location.hostname + '/cas_login';

class CasLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.loginWithCasAuthentication();
    }

    loginWithCasAuthentication = () => {
        const CasLoginApi = Client1.Client4.getUsersRoute() + '/cas_login';
        const {location} = this.props;
        const params = queryString.parse(location.search);
        const {ticket} = params;
        if (ticket == null) {
            this.redirectToCasServerToLogin();
        } else {
            axios.get(CasLoginApi, {
                params: {
                    service: ServiceURL,
                    ticket,
                }
            }).
                then((res) => {
                    const {data: user} = res;
                }).
                catch((err) => {
                    // TODO: Handle errors here
                });
        }
    };

    redirectToCasServerToLogin = () => {
        const CasServerURL = 'https://www.youshengyun.com/sso';
        const CasLoginURL = `${CasServerURL}/login`;
        window.location.replace(`${CasLoginURL}?service=${ServiceURL}`);
    };

    render() {
        return null;
    }
}

CasLogin.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
    }).isRequired,
};

export default CasLogin;
