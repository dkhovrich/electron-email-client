import { createAction, ActionFunctionAny, Action, BaseAction } from 'redux-actions';
import { createAsyncAction, IAsyncAction } from './utils';
import { IEmail, Category } from '../types/email';

const prefix: string = 'EMAILS';

export const fetch: IAsyncAction<Category, IEmail[], void> = createAsyncAction<Category, IEmail[], void>(prefix);
export const toggleRead: ActionFunctionAny<Action<string>> = createAction<string>(`${prefix}/TOGGLE_READ`);
export const remove: ActionFunctionAny<Action<string>> = createAction<string>(`${prefix}/REMOVE`);
export const reset: ActionFunctionAny<BaseAction> = createAction(`${prefix}/RESET`);
