// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// This file contains server-side users Apis

import {getAxiosInstance} from '../utils/axios_request';

const Client1 = require('mattermost-redux/client');
const UsersRoute = Client1.Client4.getUsersRoute();

export function casLogIn(params = {}) {
    return getAxiosInstance().get(`${UsersRoute}/cas_login`, {params});
}
