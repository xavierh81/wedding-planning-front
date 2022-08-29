// Imports
import React from 'react';
import { t } from '@lingui/macro';
import { Row, Col } from 'antd';

// Components
import MainLayout from 'components/layouts/MainLayout';

// Load images
import HomeBannerImage from 'assets/images/homepage_banner.png'

// Config
import { DEFAULT_SMALL_GRID } from 'config/constants';

//
// Core
//

function Home() {
    //
    // Main Render
    //
    return (
        <MainLayout>
            <div className="homeBanner">
                <img src={HomeBannerImage} alt="V&X" />
            </div>

            <Row>
                <Col {...DEFAULT_SMALL_GRID}>
                    <div className="homeBloc">
                        <span className="title">{t`homepage_details_coming_soon`}</span>
                    </div>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default Home;
