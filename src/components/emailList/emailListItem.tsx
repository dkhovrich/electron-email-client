import React, { useMemo } from 'react';
import { DateTime } from 'luxon';
import classnames from 'classnames';
import { Row, Col } from 'antd';

import { IEmail } from '../../types/email';

interface IProps {
    email: IEmail;
}

const formatDate = (date: Date): string => DateTime.fromJSDate(date).toFormat('LLL d t');

const EmailListItem = ({ email }: IProps) => {
    const dateFormatted: string = useMemo(() => formatDate(email.date as Date), [email.date]);
    const className: string = classnames('email-list__item__container', {
        'email-list__item__container--unread': !email.isRead,
    });

    return (
        <div className={className}>
            <Row justify="space-between" className="email-list__item__container__row">
                <Col span={16} className="email-list__item__container_column">
                    <span className="email-list__item__container__from">
                        {email.from}
                    </span>
                </Col>
                <Col span={8} className="email-list__item__container__date__column">
                    <span className="email-list__item__container__date">
                        {dateFormatted}
                    </span>
                </Col>
            </Row>
            <Row className="email-list__item__container__row">
                <span className="email-list__item__container__subject">
                    {email.subject}
                </span>
            </Row>
            <Row className="email-list__item__container__row">
                <p className="email-list__item__container__preview">
                    {email.preview}
                </p>
            </Row>
        </div>
    );
};

export default EmailListItem;
