import { Action } from 'redux';

type reducerType<TState> = (state: TState, action: Action) => TState;

interface IHandler<TState> {
    [key: string]: reducerType<TState>;
}

export function createReducer<TState>(initialState: TState, handlers: IHandler<TState>): reducerType<TState> {
    return function reducer(state: TState = initialState, action: Action): TState {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
}
