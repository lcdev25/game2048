export const setItemToLocalStorage = (item: string, value: string) => {
    try {
        localStorage.setItem(item, value);
    } catch (e) {
        console.error(
            'Error while setting the local storage. ' + JSON.stringify(e)
        );
    }
};

export const getItemFromLocalStorage = (item: string): string | null => {
    try {
        return localStorage.getItem(item);
    } catch (e) {
        console.error(
            'Error while getting the local storage. ' + JSON.stringify(e)
        );
    }
    return null;
};

export const deleteItemFromLocalStorage = (item: string) => {
    try {
        localStorage.removeItem(item);
    } catch (e) {
        console.error(
            'Error while removing the local storage. ' + JSON.stringify(e)
        );
    }
};
