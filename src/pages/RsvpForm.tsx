// Imports
import React from 'react';
import { t } from '@lingui/macro';
import Autocomplete from "react-google-autocomplete";

// Ant Design
import { Row, Col, Form, Input, Select } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

// Components
import MainLayout from 'components/layouts/MainLayout';
import { RoundedButton } from 'components/RoundedButton';
import YesNoSwitch from 'components/form/YesNoSwitch';

// Helpers
import { loadConfig } from 'helpers/global';

// Config
import { DEFAULT_SMALL_GRID, WeddingPersonKind } from 'config/constants';
import { createRsvpRequest } from 'services/RsvpService';

const config = loadConfig();

//
// Core
//

// Define person type
type Person = {
    kind: number,
    firstname: string,
    lastname: string,
    coming: boolean,
    special_diet: boolean,
    special_diet_note: string
}

// Define main state type
type LoginState = {
    peopleIndexes: number[],
    address: string,

    formProcessing: boolean,
    formError: string | null
}

// Main element
function RsvpForm() {
    // Define state variables
    const [state, setState] = React.useState<LoginState>({ peopleIndexes: [1], address: '', formProcessing: false, formError: null });
    
    // Define form variable
    const [form] = Form.useForm();

    // Get default form value for a person
    const getDefaultFormValueForPerson = (personIndex : number) => {
        return {
            [`person_${personIndex}_kind`]: WeddingPersonKind.ADULT,
            [`person_${personIndex}_firstname`]: '',
            [`person_${personIndex}_lastname`]: '',
            [`person_${personIndex}_coming`]: null,
            [`person_${personIndex}_special_diet`]: false,
            [`person_${personIndex}_special_diet_note`]: null
        }
    }

    //
    // UI Actions
    //

    // Add a new person to the RSVP form
    const addNewPerson = () => {
        const newPeopleIndexes = state.peopleIndexes;
        const lastPersonIndex = state.peopleIndexes[state.peopleIndexes.length-1];
        const nextPersonIndex = lastPersonIndex+1;
        newPeopleIndexes.push(nextPersonIndex);
        setState(prevState => ({ ...prevState, peopleIndexes: newPeopleIndexes}));

        // Set default form fields
        form.setFieldsValue(getDefaultFormValueForPerson(nextPersonIndex))
    }

    // Remove a person from the RSVP form
    const removePerson = (arrayIndex: number, personIndex: number) => {
        if(state.peopleIndexes.length <= 1) return;

        const newPeopleIndexes = state.peopleIndexes;
        newPeopleIndexes.splice(arrayIndex, 1)
        setState(prevState => ({ ...prevState, peopleIndexes: newPeopleIndexes}));
        
        // Reset form fields
        form.setFieldsValue(getDefaultFormValueForPerson(personIndex))
    }

    //
    // Form submit
    //

    const onPressSubmit = () => {
        form.submit();
    }

    const onFormSubmit = () => {
        setState(prevState => ({ ...prevState, formProcessing: true, formError: null }))

        // Validate the form
        form.validateFields()
			.then((values) => {
                // Format post data with all form values
                const postData = {
                    contact_mail: values.contact_mail,
                    contact_address: state.address,
                    notes: values.notes,
                    people: [] as Person[]
                }

                state.peopleIndexes.forEach((personIndex) => {
                    postData.people.push({
                        kind: values[`person_${personIndex}_kind`] >= 1 ? values[`person_${personIndex}_kind`] : WeddingPersonKind.ADULT,
                        firstname: values[`person_${personIndex}_firstname`],
                        lastname: values[`person_${personIndex}_lastname`],
                        coming: values[`person_${personIndex}_coming`],
                        special_diet: values[`person_${personIndex}_coming`] === true ? values[`person_${personIndex}_special_diet`] : false,
                        special_diet_note: values[`person_${personIndex}_special_diet_note`]
                    })
                })

                createRsvpRequest(postData).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    setState(prevState => ({ ...prevState, formProcessing: false, formError: error }))
                });
			})
			.catch(() => {
                setState(prevState => ({ ...prevState, formProcessing: false, formError: "Form not valid" }))
            });
    }

    //
    // Main Render
    //
    return (
        <MainLayout>
            <Row className="mainFormTheme">
                <Col {...DEFAULT_SMALL_GRID}>
                    <Form
                        name="rsvp"
                        form={form}
                        className="formContent"
                        onFinish={onFormSubmit}
                    >
                        <div className="formSection">
                            <span className="title">{t`rsvp_peoples_section_title`}</span>
                            <span className="desc">{t`rsvp_peoples_section_desc`}</span>

                            {state.peopleIndexes.map((personIndex, index) => {
                                return (
                                    <div key={`person_${personIndex}`} className="personFormDetails">
                                        <div key={`person_${personIndex}_info`} className="inlineFormItems">
                                            <Form.Item name={`person_${personIndex}_kind`} className="small">
                                                <Select defaultValue={WeddingPersonKind.ADULT} value={WeddingPersonKind.ADULT}>
                                                    <Select.Option key={`person_kind_${WeddingPersonKind.ADULT}`} value={WeddingPersonKind.ADULT}>{t`wedding_person_kind_1`}</Select.Option>
                                                    <Select.Option key={`person_kind_${WeddingPersonKind.KID}`} value={WeddingPersonKind.KID}>{t`wedding_person_kind_2`}</Select.Option>
                                                    <Select.Option key={`person_kind_${WeddingPersonKind.BABY}`} value={WeddingPersonKind.BABY}>{t`wedding_person_kind_3`}</Select.Option>
                                                </Select>
                                            </Form.Item>

                                            <Form.Item name={`person_${personIndex}_firstname`} rules={[{ required: true, message: '' }]}>
                                                <Input placeholder={t`global_form_field_firstname_placeholder`} />
                                            </Form.Item>

                                            <Form.Item name={`person_${personIndex}_lastname`} rules={[{ required: true, message: '' }]}>
                                                <Input placeholder={t`global_form_field_lastname_placeholder`}  />
                                            </Form.Item>

                                            <button type="button" className="removeFormRow" onClick={() => removePerson(index, personIndex)}>
                                                <DeleteOutlined />
                                            </button>
                                        </div>

                                        <div key={`person_${personIndex}_availability`} className="inlineFormItems">
                                            <span>{t`rsvp_people_coming_question`}</span>
                                            <Form.Item name={`person_${personIndex}_coming`} rules={[{ required: true, message: '' }]}>
                                                <YesNoSwitch />
                                            </Form.Item>
                                        </div>

                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, currentValues) => prevValues[`person_${personIndex}_coming`] !== currentValues[`person_${personIndex}_coming`]}
                                        >
                                            {({ getFieldValue }) =>
                                                getFieldValue(`person_${personIndex}_coming`) === true ? (
                                                    <div key={`person_${index}_diet`} className="inlineFormItems">
                                                        <span>{t`rsvp_people_special_diet_question`}</span>
                                                        <Form.Item name={`person_${personIndex}_special_diet`} rules={[{ required: true, message: '' }]}>
                                                            <YesNoSwitch />
                                                        </Form.Item>
                                                    </div>
                                                ) : null
                                            }
                                        </Form.Item>

                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, currentValues) => prevValues[`person_${personIndex}_coming`] !== currentValues[`person_${personIndex}_coming`] || prevValues[`person_${personIndex}_special_diet`] !== currentValues[`person_${personIndex}_special_diet`]}
                                        >
                                            {({ getFieldValue }) =>
                                                getFieldValue(`person_${personIndex}_coming`) === true && getFieldValue(`person_${personIndex}_special_diet`) === true ? (
                                                    <div key={`person_${personIndex}_diet_note`} className="inlineFormItems">
                                                        <Form.Item name={`person_${personIndex}_special_diet_note`} rules={[{ required: true, message: '' }]}>
                                                            <Input placeholder={t`rsvp_people_special_diet_placeholder`} />
                                                        </Form.Item>
                                                    </div>
                                                ) : null
                                            }
                                        </Form.Item>
                                    </div>
                                )
                            })}

                            <button type="button" className="actionButton" style={{marginTop:20, marginBottom:20}} onClick={() => addNewPerson()}><PlusCircleOutlined /> {t`rsvp_peoples_add_button`}</button>
                        </div>

                        <div className="formSection">
                            <span className="title">{t`rsvp_contact_info_title`}</span>

                            <Row>
                                <Col sm={24} md={{span:16, offset:4}}>
                                    <div className="inlineFormItems">
                                        <Form.Item name={`contact_mail`} rules={[{ required: true, type:"email", message: '' }]}>
                                            <Input placeholder={t`global_form_field_mail_placeholder`} />
                                        </Form.Item>
                                    </div>
                                    <div className="inlineFormItems">
                                        <Autocomplete
                                            apiKey={config.googleMapsApiKey}
                                            options={{
                                                types: ["address"],
                                            }}
                                            placeholder={t`global_form_field_address_placeholder`}

                                            onPlaceSelected={(place) => {
                                                if(place) {
                                                    setState(prevState => ({ ...prevState, address: place.formatted_address}));
                                                }
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="formSection">
                            <span className="title">{t`rsvp_notes_title`}</span>

                            <Row>
                                <Col sm={24} md={{span:16, offset:4}}>
                                    <div className="inlineFormItems">
                                        <Form.Item name={`notes`}>
                                            <Input.TextArea rows={3} />
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        {state.formError != null && <span className="formError">{state.formError}</span>}
                        
                        <div className="formActions">
                            <RoundedButton className={`submitButton`} enabled={!state.formProcessing} loading={state.formProcessing} onClick={() => onPressSubmit()} text={t`rsvp_form_submit`} />
                        </div>
                    </Form>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default RsvpForm;
