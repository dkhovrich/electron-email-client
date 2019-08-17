import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Layout, PageHeader, Button, Modal, Typography } from 'antd';

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
        <Layout>
            <PageHeader
                title={email.subject}
                className="selected-email__page-header"
                extra={[
                    <Button key="1" onClick={onToggleRead}>
                        {email.isRead ? 'Unread' : 'Read'}
                    </Button>,
                    <Button key="2" type="danger" onClick={onRemove}>
                        Remove
                    </Button>,
                    <Button key="3" type="primary" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
            <Content className="selected-email__content">
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
