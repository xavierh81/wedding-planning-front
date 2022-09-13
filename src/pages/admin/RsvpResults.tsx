// Imports
import React, { useEffect } from 'react';
import { t } from '@lingui/macro';
import moment from 'moment';

// Ant Design
import { Row, Col, Form, Input } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { AlertOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

// Components
import MainLayout from 'components/layouts/MainLayout';
import { RoundedButton } from 'components/RoundedButton';
import { PageLoader } from 'components/PageLoader';

// Helpers
import { loadConfig } from 'helpers/global';

// Services
import { retrieveRsvpResults, RsvpResponse } from 'services/RsvpService';

// Config
const config = loadConfig();

//
// Core
//

// Define main state type
type RsvpResultsState = {
    showResults: boolean,
    rsvpResults: RsvpResponse[],
    loading: boolean,
    formError: string | null
}

function RsvpResults() {

    // Define state variables
    const [state, setState] = React.useState<RsvpResultsState>({ showResults: false, rsvpResults: [], loading: true, formError: null });

    // Define form variable
    const [form] = Form.useForm();

    // When showResults state change, triggers the API load
    useEffect(() => {
        
        if(state.showResults === true) {
            retrieveRsvpResults().then((data) => {
                console.log(data);
                // Save data in local state
                setState(prevState => ({ ...prevState, rsvpResults: data, loading: false}))
            })
            .catch(() => {
                setState(prevState => ({ ...prevState, loading: false}))
            });
        }
    }, [state.showResults])

    //
    // Table
    //
    const getTableColumns = () : ColumnsType<RsvpResponse> => {
        return [
            {
                title: t`rsvp_results_request_date`,
                dataIndex: 'requestDate',
                key: 'requestDate',
                render: (_, { requestDate }) => (
                    <span>{moment(requestDate).format('LLL')}</span>
                ),
                defaultSortOrder: 'descend',
                sorter: (a, b) => moment(a.requestDate).diff(moment(b.requestDate), 'seconds', true),
            },
            {
                title: t`rsvp_results_contact_mail`,
                dataIndex: 'contact_mail',
                key: 'contact_mail',
            },
            {
                title: t`rsvp_results_contact_address`,
                dataIndex: 'contact_address',
                key: 'contact_address',
            },
        
            {
                title: t`rsvp_results_people`,
                dataIndex: 'people',
                key: 'people',
                render: (_, { requestId, people }) => (
                    <>
                        {people.map((person, index) => {
        
                            return (
                                <div key={`request_${requestId}_${index}`} className="personAnswer">
                                    <div>{person.coming ? <CheckCircleOutlined style={{color: 'mediumSeaGreen'}} /> : <CloseCircleOutlined style={{color: 'lightCoral'}} />} {person.firstname} {person.lastname}</div>
                                    {person.special_diet === true && 
                                        <div className="specialDiet">
                                            <AlertOutlined /> {person.special_diet_note}
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </>
                )
            },
        
            {
                title: t`rsvp_results_notes`,
                dataIndex: 'notes',
                key: 'notes',
            }
        ]
    }

    //
    // Form actions
    //
    const onPressSubmit = () => {
        form.submit();
    }

    const onFormSubmit = () => {
        setState(prevState => ({ ...prevState, formError: null }))

        // Validate the form
        form.validateFields()
			.then((values) => {
                if(values.password === config.rsvpResultsSecretKey) {
                    setState(prevState => ({ ...prevState, showResults: true }))
                }
                else
                {
                    setState(prevState => ({ ...prevState, formError: "Wrong password" }))
                }
            })
            .catch(() => {
                setState(prevState => ({ ...prevState, formError: "Wrong password" }))
            });
    }

    // Rendering

    const renderStatsSummary = () => {
        const nbPeople = state.rsvpResults.reduce((sum, value) => { return sum + value.people.filter(p => p.coming).length }, 0)
        const nbAdults = state.rsvpResults.reduce((sum, value) => { return sum + value.people.filter(p => p.coming && p.kind === "ADULT").length }, 0)
        const nbKids = state.rsvpResults.reduce((sum, value) => { return sum + value.people.filter(p => p.coming && p.kind === "KID").length }, 0)
        const nbBabies = state.rsvpResults.reduce((sum, value) => { return sum + value.people.filter(p => p.coming && p.kind === "BABY").length }, 0)

        return (
            <div className="summary">
                <span className="title">{t`rsvp_results_summary_title`}</span>
                <div className="summaryEntry big">
                    <span className="label">{t`rsvp_results_nb_people_coming`}</span>
                    <span className="value">{nbPeople}</span>
                </div>

                <div className="summaryEntry">
                    <span className="label">{t`rsvp_results_nb_adult_coming`}</span>
                    <span className="value">{nbAdults}</span>
                </div>

                <div className="summaryEntry">
                    <span className="label">{t`rsvp_results_nb_kids_coming`}</span>
                    <span className="value">{nbKids}</span>
                </div>

                <div className="summaryEntry">
                    <span className="label">{t`rsvp_results_nb_babies_coming`}</span>
                    <span className="value">{nbBabies}</span>
                </div>
            </div>
        )
    }

    //
    // Main Render
    //
    return (
        <MainLayout hideHeader={true}>
            {state.showResults === false && 
                <Row className="mainTheme">
                    <Col xs={24} sm={{span:6, offset:9}}>
                        <Form
                            name="rsvp_results_secure"
                            form={form}
                            className="formContent"
                            onFinish={onFormSubmit}
                        >
                            <div className="section">
                                <span className="title">{t`rsvp_results_title`}</span>
                                <span className="desc">{t`rsvp_results_desc`}</span>
                            </div>

                            <Form.Item name={`password`} rules={[{ required: true, message: '' }]}>
                                <Input.Password />
                            </Form.Item>

                            {state.formError != null && <span className="formError">{state.formError}</span>}

                            <div className="formActions">
                                <RoundedButton className={`submitButton`} onClick={() => onPressSubmit()} text={t`rsvp_results_submit`} />
                            </div>
                        </Form>
                    </Col>
                </Row>
            }

            {state.showResults === true && state.loading === true &&
                <Row className="mainTheme">
                    <PageLoader />
                </Row>
            }

            {state.showResults === true && state.loading === false &&
                <div className="rsvpResultsContainer">
                    {renderStatsSummary()}
                    <Table columns={getTableColumns()} dataSource={state.rsvpResults} rowKey={record => record.requestId} pagination={false} />
                </div>
            }
        </MainLayout>
    )
}

export default RsvpResults;