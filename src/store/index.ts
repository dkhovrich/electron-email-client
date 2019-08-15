import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer, IRootState } from '../reducers';
import rootSaga from '../sagas';

const configureStore = (initialState?: IRootState): Store<IRootState | undefined> => {
    const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
    const middlewares: any[] = [sagaMiddleware];

    const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
    const appStore: Store<IRootState | undefined> = createStore(rootReducer, initialState, enhancer);

    sagaMiddleware.run(rootSaga);
    return appStore;
};

const store: Store<IRootState | undefined> = configureStore();

if ((module as any).hot) {
    (module as any).hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers').rootReducer),
    );
}

export default store;
