import { takeEvery, call, put } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { notification } from 'antd';

import * as actions from '../actions/emailsActions';
import { IEmail, IToggleRead, Category } from '../types/email';
import { fetchEmailsStub } from '../stubs/email';

const fetch = {
    * request(action: Action<Category>) {
        const response: IEmail[] = yield call(fetchEmailsStub, action.payload);
        yield put(actions.fetch.success(response));
    },
};

function toggleRead(action: Action<IToggleRead>) {
    const { isRead } = action.payload;

    notification.success({
        message: `Email has been marked as ${isRead ? 'unread' : 'read'}`,
    });
}

function remove() {
    notification.success({
        message: 'Email has been removed',
    });
}

export default function* saga() {
    yield takeEvery(actions.fetch.request().type, fetch.request);
    yield takeEvery(actions.toggleRead().type, toggleRead);
    yield takeEvery(actions.remove().type, remove);
}
