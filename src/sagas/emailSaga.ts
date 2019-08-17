import { takeEvery, call, put } from 'redux-saga/effects';
import { notification } from 'antd';

import {
    FETCH_REQUEST,
    TOGGLE_READ,
    REMOVE,
    IFetchRequestAction,
    IToggleReadAction,
    fetch as fetchAction,
} from '../actions/emailsActions';
import { IEmail } from '../types/email';
import { fetchEmailsStub } from '../stubs/email';

const fetch = {
    * request(action: IFetchRequestAction) {
        const response: IEmail[] = yield call(fetchEmailsStub, action.payload);
        yield put(fetchAction.success(response));
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
