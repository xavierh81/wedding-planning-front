// Imports
import React from 'react';
import { t } from '@lingui/macro';
import { useNavigate } from 'react-router-dom';

// Ant Design
import { Row, Col } from 'antd';

// Components
import MainLayout from 'components/layouts/MainLayout';
import { RoundedButton } from 'components/RoundedButton';

// Load images
import HomeBannerImage from 'assets/images/homepage_banner.png'

// Config
import { DEFAULT_SMALL_GRID, SiteRoutes } from 'config/constants';

//
// Core
//

function RsvpForm() {
    //
    // Main Render
    //
    return (
        <MainLayout>
            <div className=""></div>
        </MainLayout>
    )
}

export default RsvpForm;
