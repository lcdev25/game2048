import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './store/app.reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import Game from './components/game/game.component';

const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

function App() {
    return (
        <Provider store={store}>
            <div className="inspiration">
                <a target="_BLANK" href="https://play2048.co/">
                    Inspired by the original
                </a>
            </div>
            <Game></Game>
            <div className="signature">
                Developer:
                <a target="_BLANK" href="https://github.com/lcdev25">
                    Lavneesh - lcdev25
                </a>
            </div>
        </Provider>
    );
}

export default App;
