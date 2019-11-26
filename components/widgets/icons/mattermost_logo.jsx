// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import logo from '../../../images/favicon/favicon-96x96.png';

export default class MattermostLogo extends React.PureComponent {
    render() {
        return (
            <span {...this.props}>
                <img
                    style={{width: '32px', height: '32px'}}
                    alt=''
                    src={logo}
                />
            </span>
        );
    }
}

const style = {
    background: {
        enableBackground: 'new 0 0 500 500',
    },
    st0: {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
    },
};
