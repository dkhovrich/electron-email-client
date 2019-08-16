import React from 'react';

import './style.css';

import { Layout } from 'antd';
import { Sidebar, EmailList } from '../../components';

const { Content } = Layout;

const Application: React.FC = () => {
    return (
        <Layout>
            <Sidebar />
            <Layout className="app-content-layout__container">
                <Content>
                    <EmailList />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Application;
