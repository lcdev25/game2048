import { RootState } from '../store/types';
import {
    getItemFromLocalStorage,
    setItemToLocalStorage,
} from './local-storage';

export const loadState = (): RootState | undefined => {
    try {
        let gameStateStr = getItemFromLocalStorage('gameState');
        if (gameStateStr) {
            return JSON.parse(gameStateStr);
        }
    } catch (e) {
        console.error(`Error while reloading state. ${JSON.stringify(e)}`);
    }
    return undefined;
};

export const saveState = (state) => {
    setItemToLocalStorage('gameState', JSON.stringify(state));
};
