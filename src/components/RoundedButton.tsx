// Imports
import React, { Component } from 'react'; 
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Define props type
type RoundedButtonProps = {
    text: string,
    onClick: () => void,
    enabled?: boolean,
    loading?: boolean,
    className?: string
}

// Define component
export class RoundedButton extends Component<RoundedButtonProps, {}> {
    static defaultProps = {
        text: '',
        enabled: true,
        loading: false,
        className: ''
    }

    // render will know everything!
    render() {
        const {text, enabled, loading, className, onClick} = this.props;

        return (
            <button type="button" className={`roundedButton ${!enabled ? "disabled " : ""}${!enabled ? "loading " : ""} ${className}`} onClick={() => onClick()} disabled={!enabled}>
                {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "#FFF" }} spin />} />}
                <span className="label">{text}</span>
            </button>
        )
    }
}