import {
    BoardActionTypes,
    INITIALISE,
    MOVE_BOTTOM,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_TOP,
} from './types';

export function moveLeft(): BoardActionTypes {
    return {
        type: MOVE_LEFT,
    };
}

export function moveRight(): BoardActionTypes {
    return {
        type: MOVE_RIGHT,
    };
}

export function moveTop(): BoardActionTypes {
    return {
        type: MOVE_TOP,
    };
}

export function moveBottom(): BoardActionTypes {
    return {
        type: MOVE_BOTTOM,
    };
}

export function initialise(): BoardActionTypes {
    return {
        type: INITIALISE,
    };
}
