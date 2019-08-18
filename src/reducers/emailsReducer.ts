import { createSelector } from 'reselect';
import { createReducer } from './utils';

import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_ERROR,
    SELECT,
    REMOVE,
    TOGGLE_READ,
    IFetchSuccessAction,
    ISelectAction,
    IRemoveAction,
    IToggleReadAction,
} from '../actions/emailsActions';
import { IEmail } from '../types/email';

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
    success(state: IEmailsState, action: IFetchSuccessAction): IEmailsState {
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

function select(state: IEmailsState, action: ISelectAction): IEmailsState {
    return {
        ...state,
        selectedId: action.payload,
    };
}

function remove(state: IEmailsState, action: IRemoveAction): IEmailsState {
    const byId: IEmailById = { ...state.byId };
    delete byId[action.payload];

    return {
        ...state,
        selectedId: state.selectedId === action.payload ? null : state.selectedId,
        byId,
        ids: state.ids.filter((id: string) => id !== action.payload),
    };
}

function toggleRead(state: IEmailsState, action: IToggleReadAction): IEmailsState {
    const email = { ...state.byId[action.payload] };
    email.isRead = !email.isRead;

    return {
        ...state,
        byId: { ...state.byId, [action.payload]: email },
    };
}

export default createReducer<IEmailsState>(initialState, {
    [FETCH_REQUEST]: fetch.request,
    [FETCH_SUCCESS]: fetch.success,
    [FETCH_ERROR]: fetch.error,
    [SELECT]: select,
    [REMOVE]: remove,
    [TOGGLE_READ]: toggleRead,
});

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

