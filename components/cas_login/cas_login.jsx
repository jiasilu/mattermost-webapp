// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import queryString from 'query-string';

import * as Utils from 'utils/utils.jsx';
import LocalStorageStore from '../../stores/local_storage_store';
import {browserHistory} from '../../utils/browser_history';
import * as GlobalActions from '../../actions/global_actions';

const ServiceURL = Utils.getHostURL() + '/cas_login';

class CasLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {requested: false};
    }

    componentDidMount() {
        const {currentUser} = this.props;
        if (currentUser == null) {
            this.loginWithCasAuthentication();
        } else {
            this.finishSignin();
        }
    }

    loginWithCasAuthentication = () => {
        const ticket = this.retrieveTicketFromParams();
        if (ticket == null) {
            this.redirectToCasServerToLogin();
        } else {
            this.props.actions.casLogIn(queryString.stringify({service: ServiceURL, ticket})).then(async ({error}) => {
                // check for query params brought over from signup_user_complete
                const params = new URLSearchParams(this.props.location.search);
                const inviteToken = params.get('t') || '';
                const inviteId = params.get('id') || '';

                if (inviteId || inviteToken) {
                    const {data: team} = await this.props.actions.addUserToTeamFromInvite(inviteToken, inviteId);
                    if (team) {
                        this.finishSignin(team);
                    } else {
                        // there's not really a good way to deal with this, so just let the user log in like normal
                        this.finishSignin();
                    }
                } else {
                    this.finishSignin();
                }
            });
        }
    };

    finishSignin = (team) => {
        const experimentalPrimaryTeam = this.props.experimentalPrimaryTeam;
        const query = new URLSearchParams(this.props.location.search);
        const redirectTo = query.get('redirect_to');

        Utils.setCSRFFromCookie();

        // Record a successful login to local storage. If an unintentional logout occurs, e.g.
        // via session expiration, this bit won't get reset and we can notify the user as such.
        LocalStorageStore.setWasLoggedIn(true);
        if (redirectTo && redirectTo.match(/^\/([^/]|$)/)) {
            browserHistory.push(redirectTo);
        } else if (team) {
            browserHistory.push(`/${team.name}`);
        } else if (experimentalPrimaryTeam) {
            browserHistory.push(`/${experimentalPrimaryTeam}`);
        } else {
            GlobalActions.redirectUserToDefaultTeam();
        }
    };

    retrieveTicketFromParams = ({location} = this.props) => {
        const params = queryString.parse(location.search);
        const {ticket} = params;
        return ticket;
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
    intl: PropTypes.any,

    isLicensed: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    customBrandText: PropTypes.string,
    customDescriptionText: PropTypes.string,
    enableCustomBrand: PropTypes.bool.isRequired,
    enableLdap: PropTypes.bool.isRequired,
    enableOpenServer: PropTypes.bool.isRequired,
    enableSaml: PropTypes.bool.isRequired,
    enableSignInWithEmail: PropTypes.bool.isRequired,
    enableSignInWithUsername: PropTypes.bool.isRequired,
    enableSignUpWithEmail: PropTypes.bool.isRequired,
    enableSignUpWithGitLab: PropTypes.bool.isRequired,
    enableSignUpWithGoogle: PropTypes.bool.isRequired,
    enableSignUpWithOffice365: PropTypes.bool.isRequired,
    experimentalPrimaryTeam: PropTypes.string,
    ldapLoginFieldName: PropTypes.string,
    samlLoginButtonText: PropTypes.string,
    siteName: PropTypes.string,
    initializing: PropTypes.bool,
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
    }).isRequired,

    actions: PropTypes.shape({
        casLogIn: PropTypes.func.isRequired,
        addUserToTeamFromInvite: PropTypes.func.isRequired,
    }).isRequired,
};

export default CasLogin;
