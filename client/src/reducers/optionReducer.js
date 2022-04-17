const SET_OPTIONS = 'SET_OPTIONS';

const defaultState = {
    frequency: 0,
    limit: ''
};

export default function optionReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_OPTIONS: return { ...state, frequency: action.payload.frequency, limit: action.payload.limit };
        default:
            return state;
    }
}

export const setOptions = options => ({ type: SET_OPTIONS, payload: options });
