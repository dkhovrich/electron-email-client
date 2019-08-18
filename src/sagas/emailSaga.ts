import { takeEvery, call, put } from 'redux-saga/effects';
import { notification } from 'antd';
import client from '../firebase/client';

import {
    FETCH_REQUEST,
    TOGGLE_READ,
    REMOVE,
    IFetchRequestAction,
    IToggleReadAction,
    fetch as fetchAction,
} from '../actions/emailsActions';
import { IEmail } from '../types/email';

const fetch = {
    * request(action: IFetchRequestAction) {
        const emails: IEmail[] = yield call(client.getEmails.bind(client), action.payload);
        yield put(fetchAction.success(emails));
    },
};

function toggleRead(action: IToggleReadAction) {
    notification.success({
        message: `Email has been marked as ${action.isRead ? 'unread' : 'read'}`,
    });
}

function remove() {
    notification.success({
        message: 'Email has been removed',
    });
}

export default function* saga() {
    yield takeEvery(FETCH_REQUEST, fetch.request);
    yield takeEvery(TOGGLE_READ, toggleRead);
    yield takeEvery(REMOVE, remove);
}
