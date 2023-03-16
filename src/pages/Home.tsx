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

function Home() {
    // Load needed hooks
    const navigate = useNavigate();

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
                    <div className="homeBloc" style={{display:"none"}}>
                        <span className="title">{t`homepage_rsvp_title`}</span>
                        <span className="desc">{t`homepage_rsvp_desc`}</span>

                        <RoundedButton text={t`homepage_rsvp_button`} onClick={() => navigate(SiteRoutes.RSVP_FORM)} />
                    </div>

                    <div className="homeBloc">
                        <span className="title">{t`homepage_planning_title`}</span>

                        <div id="planning">
                            <div className="planningItem">
                                <span className="hour">{t`homepage_planning_item_1_hour`}</span>
                                <span className="desc">{t`homepage_planning_item_1_desc`}</span>
                                <span className="additionalDesc">{t`homepage_planning_item_1_additional_desc`}</span>
                            </div>
                            <div className="planningItem">
                                <span className="hour">{t`homepage_planning_item_2_hour`}</span>
                                <span className="desc">{t`homepage_planning_item_2_desc`}</span>
                            </div>
                            <div className="planningItem">
                                <span className="hour">{t`homepage_planning_item_3_hour`}</span>
                                <span className="desc">{t`homepage_planning_item_3_desc`}</span>
                            </div>
                            <div className="planningItem">
                                <span className="hour">{t`homepage_planning_item_4_hour`}</span>
                                <span className="desc">{t`homepage_planning_item_4_desc`}</span>
                            </div>
                            <div className="planningItem">
                                <span className="hour">{t`homepage_planning_item_5_hour`}</span>
                                <span className="desc">{t`homepage_planning_item_5_desc`}</span>
                            </div>
                            <div className="planningItem">
                                <span className="hour">{t`homepage_planning_item_6_hour`}</span>
                                <span className="desc">{t`homepage_planning_item_6_desc`}</span>
                            </div>
                            <div className="planningItem">
                                <span className="hour">{t`homepage_planning_item_7_hour`}</span>
                                <span className="desc">{t`homepage_planning_item_7_desc`}</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default Home;