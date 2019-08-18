import React from 'react';
import { useSelector } from 'react-redux';
import { List } from 'antd';

import './style.css';

import EmailListItem from './emailListItem';
import EmailSkeletons from './emailSkeletons';

import { IEmail } from '../../types/email';
import { selectFetching, selectEmails, selectSelectedEmailId } from '../../reducers/emailsReducer';

const EmailList: React.FC = () => {
    const fetching: boolean = useSelector(selectFetching);
    const emails: IEmail[] = useSelector(selectEmails);
    const selectedEmailId: string | null = useSelector(selectSelectedEmailId);

    return (
        <div className="email-list__container">
            {fetching ? <EmailSkeletons />
                : (
                    <List
                        itemLayout="horizontal"
                        dataSource={emails}
                        renderItem={(email) => (
                            <EmailListItem
                                key={email.id}
                                email={email}
                                isSelected={selectedEmailId === email.id}
                            />
                        )}
                    />
                )}
        </div>
    );
};

export default EmailList;
