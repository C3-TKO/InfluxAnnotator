import * as types from '../actions/actionTypes';

const initialState = {
    selected: undefined,
    credentials: []
};

export default function databases(state = initialState, action = {}) {
    switch (action.type) {
        case types.ADD_DATABASE:
            return {
            ...state,
            credentials: [
                ...state.credentials,
                {
                    ...action.database
                }]
            };
        /*
        case types.EDIT_DATABASE:
            return {
                ...state,
                count: state.count - 1
            };
        case types.DELETE_DATABASE:
            return {
                ...state,
                count: state.count - 1
            };
            */
        default:
            return state;
    }
}