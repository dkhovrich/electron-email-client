import React from 'react';
import { useSelector } from 'react-redux';
import { List } from 'antd';

import './style.css';

import EmailListItem from './emailListItem';

import { IEmail } from '../../types/email';
import { selectEmails } from '../../reducers/emailsReducer';

const EmailList: React.FC = () => {
    const emails: IEmail[] = useSelector(selectEmails);

    return (
        <div className="email-list-container">
            <List
                itemLayout="horizontal"
                dataSource={emails}
                renderItem={(email) => <EmailListItem email={email} />}
            />
        </div>
    );
};

export default EmailList;
