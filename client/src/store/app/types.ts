export const APP_LOADED = 'APP_LOADED';
export const VISIT_ORIGINAL = 'VISIT_ORIGINAL';
export const VISIT_PROFILE = 'VISIT_PROFILE';
export const VISIT_CONTRIBUTE = 'VISIT_CONTRIBUTE';
export const LOCAL_TOP_SCORE = 'LOCAL_TOP_SCORE';

interface AppLoaded {
    type: typeof APP_LOADED;
}

interface VisitProfile {
    type: typeof VISIT_PROFILE;
}

interface VisitOriginal {
    type: typeof VISIT_ORIGINAL;
}

interface VisitContribute {
    type: typeof VISIT_CONTRIBUTE;
}

interface SetLocalTopScore {
    type: typeof LOCAL_TOP_SCORE;
    payload: number;
}

export type AppActions =
    | AppLoaded
    | VisitProfile
    | VisitOriginal
    | VisitContribute
    | SetLocalTopScore;

export interface AppState {
    appLoaded: boolean;
    localTopScore: number;
}
