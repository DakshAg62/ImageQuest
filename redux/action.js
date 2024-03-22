export const ADD_NOTES = 'ADD_NOTES';

export const updateInput = (inputValue) => ({
    type: ADD_NOTES,
    payload: {
        id: Math.random().toString(36).substr(2, 9), // Generate unique ID
        text: inputValue
    }
});