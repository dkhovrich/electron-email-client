import { combineReducers } from 'redux';

import emailsReducer, { IEmailsState } from './emailsReducer';

export interface IRootState {
    emails: IEmailsState;
}

export const rootReducer = combineReducers<IRootState | undefined>({
    emails: emailsReducer,
});
