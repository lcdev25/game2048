import { LOCAL_TOP_SCORE } from './types';
import { RootState } from '../types';

export function appMiddleware(store) {
    return (next) => (action) => {
        next(action);
        switch (action.type) {
            case LOCAL_TOP_SCORE:
                const state: RootState = store.getState();
                localStorage.setItem(
                    'localTopScore',
                    String(state.appState.localTopScore)
                );
        }
    };
}
