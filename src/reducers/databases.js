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
                selected: state.credentials.length,
                credentials: [
                    ...state.credentials,
                    {
                        ...action.database
                    }
                ]
            };
        /*
        case types.EDIT_DATABASE:
            return {
                ...state,
                count: state.count - 1
            };
            */

        case types.DELETE_DATABASE:
            return {
                ...state,
                selected: (state.credentials.length === 1) ? undefined : state.credentials.length - 1,
                credentials: state.credentials.filter((credential, index) => index != action.index)
            };

        case types.SELECT_DATABASE:
            return {
                ...state,
                selected: action.index
            };
        default:
            return state;
    }
}