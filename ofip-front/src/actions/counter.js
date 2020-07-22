export const increment = (nmr) => {
    return {
        type: 'INCREMENT',
        payload: nmr
    };
};

export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

export const counterActions = {
    increment,
    decrement
}