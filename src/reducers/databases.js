import * as types from '../actions/actionTypes';

const initialState = {
    databases: []
};

export default function counter(state = initialState, action = {}) {
    switch (action.type) {
        case types.ADD_DATABASE:
            return {
                ...state,
                count: state.count + 1
            };
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
        default:
            return state;
    }
}