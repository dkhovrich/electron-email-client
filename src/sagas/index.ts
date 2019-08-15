import { all } from 'redux-saga/effects';

import emailSaga from './emailSaga';

export default function* rootSaga() {
    yield all([
        emailSaga(),
    ]);
}
