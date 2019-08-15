import { createAction, ActionFunctionAny, Action } from 'redux-actions';

export interface IAsyncAction<TRequest, TSuccess, TError> {
    request: ActionFunctionAny<Action<TRequest>>;
    success: ActionFunctionAny<Action<TSuccess>>;
    error: ActionFunctionAny<Action<TError>>;
}

export function createAsyncAction<TRequest, TSuccess, TError>(prefix: string)
    : IAsyncAction<TRequest, TSuccess, TError> {
    return {
        request: createAction<TRequest>(`${prefix}/FETCH`),
        success: createAction<TSuccess>(`${prefix}/SUCCESS`),
        error: createAction<TError>(`${prefix}/ERROR`),
    };
}
