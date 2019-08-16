import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import classnames from 'classnames';
import { Row, Col, List } from 'antd';

import { IEmail } from '../../types/email';
import { formatDate } from '../../utils/date';

interface IProps {
    email: IEmail;
    isSelected: boolean;
}

import { select } from '../../actions/emailsActions';

const EmailListItem = ({ email, isSelected }: IProps) => {
    const dispatch: Dispatch = useDispatch();

    const dateFormatted: string = useMemo(() => formatDate(email.date as Date), [email.date]);

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
        </List.Item>
    );
};

export default EmailListItem;
