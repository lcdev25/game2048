import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import gameInfoMiddleware from './store/game-info/middleware';
import { rootReducer } from './store/reducers';
import { boardMiddleware } from './store/board/middleware';
import { loadState, saveState } from './utils/state';

const middlewares = [thunk, gameInfoMiddleware, boardMiddleware];

const store = createStore(
    rootReducer,
    loadState(),
    composeWithDevTools(applyMiddleware(...middlewares))
);

store.subscribe(() => {
    saveState(store.getState());
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
