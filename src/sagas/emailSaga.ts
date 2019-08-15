import { takeEvery, call, put } from 'redux-saga/effects';

import * as actions from '../actions/emailsActions';
import { IEmail } from '../types/email';
import { fetchEmailsStub } from '../stubs/email';

const fetch = {
    * request() {
        const response: IEmail[] = yield call(fetchEmailsStub);
        yield put(actions.fetch.success(response));
    },
};

export default function* saga() {
    yield takeEvery(actions.fetch.request().type, fetch.request);
}
