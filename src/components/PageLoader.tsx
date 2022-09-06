// Imports
import React, { Component } from 'react'; 
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Define component
export class PageLoader extends Component {
    static defaultProps = {
        text: '',
        enabled: true,
        loading: false,
        className: ''
    }

    // render will know everything!
    render() {
        return (
            <div className="pageLoader">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 82 }} spin />} />
            </div>
        )
    }
}