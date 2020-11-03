// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import logo from '../../../images/favicon/favicon-96x96.png';

export default function MattermostLogo(props) {
    return (
        <span {...props}>
            <img
                style={{width: '32px', height: '32px'}}
                alt=''
                src={logo}
            />
        </span>
    );
}