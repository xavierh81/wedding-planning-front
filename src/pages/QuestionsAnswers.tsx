// Imports
import React from 'react';
import { t } from '@lingui/macro';

// Ant Design
import { Row, Col } from 'antd';

// Components
import MainLayout from 'components/layouts/MainLayout';

// Helpers 
import { loadConfig } from 'helpers/global';

// Config
import { DEFAULT_SMALL_GRID } from 'config/constants';
import moment from 'moment';

const config = loadConfig();

//
// Core
//

function QuestionsAnswers() {
    //
    // Main Render
    //
    return (
        <MainLayout>
            <Row className="mainFormTheme">
                <Col {...DEFAULT_SMALL_GRID}>
                    <div className="formSection">
                        <span className="title">{t`qa_entry_1_question`}</span>
                        <span className="desc">{t`qa_entry_1_answer`}</span>
                    </div>
                    <div className="formSection">
                        <span className="title">{t`qa_entry_2_question`}</span>
                        <span className="desc">{t`qa_entry_2_answer`}</span>
                    </div>
                    <div className="formSection">
                        <span className="title">{t`qa_entry_3_question`}</span>
                        <span className="desc">{t({id: "qa_entry_3_answer", values:{date: moment(config.weddingSettings.rsvpDeadline, "YYYY-MM-DD").format("LL")}})}</span>
                    </div>
                    <div className="formSection">
                        <span className="title">{t`qa_entry_4_question`}</span>
                        <span className="desc">{t`qa_entry_4_answer`}</span>
                    </div>
                    <div className="formSection">
                        <span className="title">{t`qa_entry_5_question`}</span>
                        <span className="desc">{t`qa_entry_5_answer`}</span>
                    </div>
                    <div className="formSection">
                        <span className="title">{t`qa_entry_6_question`}</span>
                        <span className="desc">{t`qa_entry_6_answer`}</span>
                    </div>
                    <div className="formSection">
                        <span className="title">{t`qa_entry_7_question`}</span>
                        <span className="desc">{t`qa_entry_7_answer`}</span>
                    </div>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default QuestionsAnswers;