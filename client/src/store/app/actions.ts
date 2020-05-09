import {
    APP_LOADED,
    LOCAL_TOP_SCORE,
    VISIT_CONTRIBUTE,
    VISIT_ORIGINAL,
    VISIT_PROFILE,
} from './types';

export function appLoaded() {
    return {
        type: APP_LOADED,
    };
}

export function setLocalTopScore(topScore: number) {
    return {
        type: LOCAL_TOP_SCORE,
        payload: topScore,
    };
}

export function visitProfile() {
    return {
        type: VISIT_PROFILE,
    };
}

export function visitContribute() {
    return {
        type: VISIT_CONTRIBUTE,
    };
}

export function visitOriginal() {
    return {
        type: VISIT_ORIGINAL,
    };
}
