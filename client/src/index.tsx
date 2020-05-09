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
import { appMiddleware } from './store/app/middleware';

const middlewares = [thunk, gameInfoMiddleware, boardMiddleware, appMiddleware];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
