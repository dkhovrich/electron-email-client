import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { PageHeader, Button } from 'antd';

import './style.css';

import { IEmail } from '../../types/email';
import { select, toggleRead, remove } from '../../actions/emailsActions';

interface IProps {
    email: IEmail;
}

const SelectedEmail = ({ email }: IProps) => {
    const dispatch: Dispatch = useDispatch();

    const onClose = useCallback(() => {
        dispatch(select(null));
    }, [dispatch]);

    const onToggleRead = useCallback(() => {
        dispatch(toggleRead(email.id));
    }, [dispatch, email.id]);

    const onRemove = useCallback(() => {
        dispatch(remove(email.id));
    }, [dispatch, email.id]);

    return (
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
        >
            <div />
        </PageHeader>
    );
};

export default SelectedEmail;
