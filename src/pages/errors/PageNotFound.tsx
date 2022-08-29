// Imports
import React from 'react';
import { t } from '@lingui/macro';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

// Components
import MainLayout from 'components/layouts/MainLayout';
import { RoundedButton } from 'components/RoundedButton';

// Config
import { DEFAULT_SMALL_GRID, SiteRoutes } from 'config/constants';


//
// Core
//

function PageNotFound() {
    // Load needed hooks
    const navigate = useNavigate();

    // Function to redirect user to homePage
    const GoBackToHome = () => {
        navigate(SiteRoutes.HOME)
    }
 
     //
     // Rendering
     //
    return (
        <MainLayout title={t`page_not_found_title`}>
            <Row>
                <Col {...DEFAULT_SMALL_GRID}>
                    <div className="homeBloc">
                        <span className="title">{t`page_not_found_bloc_title`}</span>
                        <RoundedButton text={t`page_not_found_back_to_home`} onClick={GoBackToHome()} />
                    </div>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default PageNotFound;
