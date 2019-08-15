import React from 'react';

import { Layout } from 'antd';
import { Sidebar, EmailList } from '../components';

const { Content } = Layout;

const Application: React.FC = () => {
    return (
        <Layout>
            <Sidebar />
            <Layout style={{ marginLeft: 200 }}>
                <Content>
                    <EmailList />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Application;
