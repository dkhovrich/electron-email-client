import { handleActions, Action, BaseAction } from 'redux-actions';
import { createSelector } from 'reselect';

import * as actions from '../actions/emailsActions';
import { IEmail } from '../types/email';

interface IEmailById {
    [key: string]: IEmail;
}

export interface IEmailsState {
    fetching: boolean;
    byId: IEmailById;
    ids: string[];
}

const initialState: IEmailsState = {
    fetching: false,
    byId: {},
    ids: [],
};

const fetch = {
    request(state: IEmailsState): IEmailsState {
        return { ...state, fetching: true };
    },
    success(state: IEmailsState, action: Action<IEmail[]>): IEmailsState {
        const byId: IEmailById = action.payload.reduce((acc: IEmailById, email: IEmail) => {
            const { id } = email;
            return { ...acc, [id]: email };
        }, {});

        const ids: string[] = action.payload.map((email: IEmail) => email.id);

        return {
            ...state,
            byId,
            ids,
            fetching: false,
        };
    },
    error(state: IEmailsState): IEmailsState {
        return { ...state, fetching: false };
    },
};

function toggleRead(state: IEmailsState, action: Action<string>): IEmailsState {
    const email = { ...state.byId[action.payload] };
    email.isRead = !email.isRead;

    return {
        ...state,
        [action.payload]: email,
    };
}

function remove(state: IEmailsState, action: Action<string>): IEmailsState {
    return {
        ...state,
        [action.payload]: undefined,
    };
}

function reset(state: IEmailsState, action: BaseAction): IEmailsState {
    return { ...initialState };
}

export default handleActions<any>({
    [actions.fetch.request().type]: fetch.request,
    [actions.fetch.success().type]: fetch.success,
    [actions.fetch.error().type]: fetch.error,
    [actions.toggleRead().type]: toggleRead,
    [actions.remove().type]: remove,
    [actions.reset().type]: reset,
}, initialState);

const getBranch = (state: any) => state.emails;

const selectEmailsById = createSelector(getBranch, (state: IEmailsState): IEmailById => state.byId);
const selectEmailIds = createSelector(getBranch, (state: IEmailsState): string[] => state.ids);

export const selectFetching = createSelector(getBranch, (state: IEmailsState): boolean => state.fetching);
export const selectEmails = createSelector(
    [selectEmailsById, selectEmailIds],
    (byId: IEmailById, ids: string[]): IEmail[] => ids.map((id) => byId[id]),
);
