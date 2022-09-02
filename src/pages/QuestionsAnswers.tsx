// Imports
import React from 'react';
import { t } from '@lingui/macro';

// Ant Design
import { Row, Col } from 'antd';

// Components
import MainLayout from 'components/layouts/MainLayout';
// Config
import { DEFAULT_SMALL_GRID } from 'config/constants';

//
// Core
//

function QuestionsAnswers() {
    //
    // Main Render
    //
    return (
        <MainLayout>
            <Row>
                <Col {...DEFAULT_SMALL_GRID}>
                    <div className="homeBloc">
                        <span className="title">{t`coming_soon`}</span>
                    </div>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default QuestionsAnswers;