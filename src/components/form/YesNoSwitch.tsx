// Imports
import React from 'react';
import {useState} from 'react';
import { t } from '@lingui/macro';

// Ant Design
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

// 
// Core
//
type YesNoSwitchProps = {
    value?: boolean;
    onChange?: (value: boolean) => void
};

const YesNoSwitch: React.FC<YesNoSwitchProps> = (props: YesNoSwitchProps): React.ReactElement => {

    const [value, setValue] = useState(props.value);

    const change = (val: boolean) => {
        setValue(val);

        if (typeof props.onChange === 'function') {
            props.onChange(val);
        }
    };

    return <div className="yesNoSwitch">
        <button type="button" className={`actionButton ${value === true ? "active" : ""}`} onClick={() => change(true)}><CheckCircleOutlined /> {t`global_yes`}</button>
        <button type="button" className={`actionButton redActive ${value === false ? "active" : ""}`} onClick={() => change(false)}><CloseCircleOutlined /> {t`global_no`}</button>
    </div>;
}

export default YesNoSwitch;