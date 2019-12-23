// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import axios from 'axios';

import {getHostURL} from './utils';

export let axiosInstance;

function newAxiosInstance() {
    const AxiosInstance = axios.create({
        baseURL: getHostURL(),
    });

    // default response handler
    AxiosInstance.interceptors.response.use((response) => response,
        (error) => Promise.reject(error));
    return AxiosInstance;
}

export function getAxiosInstance(independentInstance = false) {
    if (independentInstance) {
        return newAxiosInstance();
    }
    if (!axiosInstance) {
        axiosInstance = newAxiosInstance();
    }
    return axiosInstance;
}
