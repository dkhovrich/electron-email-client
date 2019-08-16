import { handleActions, Action } from 'redux-actions';
import { createSelector } from 'reselect';

import * as actions from '../actions/emailsActions';
import { IEmail, IToggleRead } from '../types/email';

interface IEmailById {
    [key: string]: IEmail;
}

export interface IEmailsState {
    fetching: boolean;
    byId: IEmailById;
    ids: string[];
    selectedId: string | null;
}

const initialState: IEmailsState = {
    fetching: false,
    byId: {},
    ids: [],
    selectedId: null,
};

const fetch = {
    request(): IEmailsState {
        return { ...initialState, fetching: true };
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

function toggleRead(state: IEmailsState, action: Action<IToggleRead>): IEmailsState {
    const { id } = action.payload;
    const email = { ...state.byId[id] };
    email.isRead = !email.isRead;

    return {
        ...state,
        byId: { ...state.byId, [id]: email },
    };
}

function remove(state: IEmailsState, action: Action<string>): IEmailsState {
    const byId: IEmailById = { ...state.byId };
    delete byId[action.payload];

    return {
        ...state,
        selectedId: state.selectedId === action.payload ? null : state.selectedId,
        byId,
        ids: state.ids.filter((id: string) => id !== action.payload),
    };
}

function reset(): IEmailsState {
    return { ...initialState };
}

function select(state: IEmailsState, action: Action<string>): IEmailsState {
    return {
        ...state,
        selectedId: action.payload,
    };
}

export default handleActions<any>({
    [actions.fetch.request().type]: fetch.request,
    [actions.fetch.success().type]: fetch.success,
    [actions.fetch.error().type]: fetch.error,
    [actions.toggleRead().type]: toggleRead,
    [actions.remove().type]: remove,
    [actions.reset().type]: reset,
    [actions.select().type]: select,
}, initialState);

const getBranch = (state: any) => state.emails;

const selectEmailsById = createSelector(getBranch, (state: IEmailsState): IEmailById => state.byId);
const selectEmailIds = createSelector(getBranch, (state: IEmailsState): string[] => state.ids);

export const selectFetching = createSelector(getBranch, (state: IEmailsState): boolean => state.fetching);
export const selectEmails = createSelector(
    [selectEmailsById, selectEmailIds],
    (byId: IEmailById, ids: string[]): IEmail[] => ids.map((id) => byId[id]),
);
export const selectSelectedEmailId = createSelector(
    getBranch,
    (state: IEmailsState): string | null => state.selectedId,
);
export const selectSelectedEmail = createSelector(
    [selectEmailsById, selectSelectedEmailId],
    (byId: IEmailById, id: string | null): IEmail | null => id ? byId[id] : null,
);

