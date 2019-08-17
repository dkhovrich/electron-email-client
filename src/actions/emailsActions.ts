import { Action } from 'redux';
import { IEmail, Category } from '../types/email';

const PREFIX: string = 'EMAILS';

export const FETCH_REQUEST: string = `${PREFIX}/REQUEST`;
export const FETCH_SUCCESS: string = `${PREFIX}/SUCCESS`;
export const FETCH_ERROR: string = `${PREFIX}/ERROR`;
export const SELECT: string = `${PREFIX}/SELECT`;
export const REMOVE: string = `${PREFIX}/REMOVE`;
export const TOGGLE_READ: string = `${PREFIX}/TOGGLE_READ`;

export interface IFetchRequestAction extends Action {
    payload: Category;
}

export interface IFetchSuccessAction extends Action {
    payload: IEmail[];
}

export interface ISelectAction extends Action {
    payload: string | null;
}

export interface IRemoveAction extends Action {
    payload: string;
}

export interface IToggleReadAction extends Action {
    payload: string;
    isRead: boolean;
}

export const fetch = {
    request(category: Category): IFetchRequestAction {
        return {
            type: FETCH_REQUEST,
            payload: category,
        };
    },
    success(emails: IEmail[]): IFetchSuccessAction {
        return {
            type: FETCH_SUCCESS,
            payload: emails,
        };
    },
    error(): Action {
        return {
            type: FETCH_ERROR,
        };
    },
};

export const select = (id: string | null): ISelectAction => ({
    type: SELECT,
    payload: id,
});

export const remove = (id: string): IRemoveAction => ({
    type: REMOVE,
    payload: id,
});

export const toggleRead = (id: string, isRead: boolean) => ({
    type: TOGGLE_READ,
    payload: id,
    isRead,
});
