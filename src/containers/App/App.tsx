import React from 'react';
import { useSelector } from 'react-redux';

import './style.css';

import { Layout, Empty, notification } from 'antd';
import { Sidebar, EmailList, SelectedEmail } from '../../components';

import { IEmail } from '../../types/email';
import { selectSelectedEmail } from '../../reducers/emailsReducer';

notification.config({
    placement: 'bottomRight',
});

const { Content } = Layout;

const Application: React.FC = () => {
    const email: IEmail | null = useSelector(selectSelectedEmail);

    return (
        <Layout>
            <Sidebar />
            <Layout className="app-content-layout__container">
                <Content className="app-content-layout__content">
                    <EmailList />
                    {email
                        ? <SelectedEmail email={email} />
                        : <Empty className="app-content-layout__content--empty" description={false} />
                    }
                </Content>
            </Layout>
        </Layout>
    );
};

export default Application;
