import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import classnames from 'classnames';
import { List, Typography } from 'antd';

import { IEmail } from '../../types/email';
import { formatDate } from '../../utils/date';

import { select } from '../../actions/emailsActions';

interface IProps {
    email: IEmail;
    isSelected: boolean;
}

const { Text, Paragraph } = Typography;

const EmailListItem = ({ email, isSelected }: IProps) => {
    const dispatch: Dispatch = useDispatch();

    const dateFormatted: string = useMemo(() => formatDate(email.date as Date, 'LLL d t'), [email.date]);

    const className: string = classnames('email-list__item__container', {
        'email-list__item__container--unread': !email.isRead,
        'email-list__item__container--selected': isSelected,
    });

    const onClick = useCallback(() => {
        dispatch(select(email.id));
    }, [dispatch, email.id]);

    return (
        <List.Item className={className}>
            <div onClick={onClick}>
                <Paragraph className="email-list__item__paragraph__from-data">
                    <Text ellipsis={true} className="email-list__item__container__from">
                        {email.from}
                    </Text>
                    <Text className="email-list__item__container__date">
                        {dateFormatted}
                    </Text>
                </Paragraph>
                <Paragraph className="email-list__item__container__subject">
                    {email.subject}
                </Paragraph>
                <Paragraph className="email-list__item__container__preview">
                    {email.preview}
                </Paragraph>
            </div>
        </List.Item>
    );
};

export default EmailListItem;
