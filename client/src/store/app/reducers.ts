import {
    APP_LOADED,
    AppActions,
    AppState,
    LOCAL_TOP_SCORE,
    VISIT_CONTRIBUTE,
    VISIT_ORIGINAL,
    VISIT_PROFILE,
} from './types';

const initialState: AppState = {
    appLoaded: false,
    localTopScore: 0,
};

export const appReducer = (state = initialState, action: AppActions) => {
    switch (action.type) {
        case APP_LOADED:
            return {
                ...state,
                appLoaded: true,
            };
        case LOCAL_TOP_SCORE:
            return {
                ...state,
                localTopScore: action.payload,
            };
        case VISIT_ORIGINAL:
        case VISIT_PROFILE:
        case VISIT_CONTRIBUTE:
            return { ...state };
        default:
            return state;
    }
};
