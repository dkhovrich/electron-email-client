import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Layout, Button, Modal, Typography, Row } from 'antd';

import './style.css';

import { IEmail } from '../../types/email';
import { formatDate } from '../../utils/date';
import { select, remove, toggleRead } from '../../actions/emailsActions';

interface IProps {
    email: IEmail;
}

const { Content } = Layout;
const { Text, Paragraph } = Typography;
const { confirm } = Modal;

const SelectedEmail = ({ email }: IProps) => {
    const dispatch: Dispatch = useDispatch();

    const dateFormatted: string = useMemo(() => formatDate(email.date as Date, 'EEEE, LLL d, t'), [email.date]);

    const onClose = useCallback(() => {
        dispatch(select(null));
    }, [dispatch]);

    const onToggleRead = useCallback(() => {
        dispatch(toggleRead(email.id, email.isRead));
    }, [dispatch, email.id, email.isRead]);

    const onRemove = useCallback(() => {
        confirm({
            title: 'Do you want to delete this email?',
            content: 'This action won\'t delete email permanently',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                dispatch(remove(email.id));
            },
        });
    }, [dispatch, email.id]);

    return (
        <Layout className="selected-email__layout">
            <Row className="selected-email__controls__row">
                <Button onClick={onToggleRead}>
                    {email.isRead ? 'Unread' : 'Read'}
                </Button>
                <Button type="danger" onClick={onRemove}>
                    Remove
                </Button>
                <Button type="primary" onClick={onClose}>
                    Close
                </Button>
            </Row>
            <Content className="selected-email__content">
                <Text className="selected-email__content__title">{email.subject}</Text>
                <div className="selected-email__content__header">
                    <Text className="selected-email__content__header__from">
                        {email.from}
                    </Text>
                    <Text className="selected-email__content__header__date">
                        {dateFormatted}
                    </Text>
                </div>
                <Paragraph>
                    {email.content}
                </Paragraph>
            </Content>
        </Layout>
    );
};

export default SelectedEmail;
