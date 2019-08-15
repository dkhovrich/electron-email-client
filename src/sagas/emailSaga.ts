import { takeEvery, call, put } from 'redux-saga/effects';
import { Action } from 'redux-actions';

import * as actions from '../actions/emailsActions';
import { IEmail, Category } from '../types/email';
import { fetchEmailsStub } from '../stubs/email';

const fetch = {
    * request(action: Action<Category>) {
        const response: IEmail[] = yield call(fetchEmailsStub, action.payload);
        yield put(actions.fetch.success(response));
    },
};

export default function* saga() {
    yield takeEvery(actions.fetch.request().type, fetch.request);
}
