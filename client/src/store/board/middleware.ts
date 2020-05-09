import { MOVE_BOTTOM, MOVE_LEFT, MOVE_RIGHT, MOVE_TOP } from './types';
import { RootState } from '../types';
import { setLocalTopScore } from '../app/actions';

export function boardMiddleware(store) {
    return (next) => (action) => {
        next(action);
        switch (action.type) {
            case MOVE_LEFT:
            case MOVE_BOTTOM:
            case MOVE_RIGHT:
            case MOVE_TOP:
                const state: RootState = store.getState();
                if (
                    state.appState.localTopScore <
                    state.boardState.present.score
                ) {
                    store.dispatch(
                        setLocalTopScore(state.boardState.present.score)
                    );
                }
        }
    };
}
