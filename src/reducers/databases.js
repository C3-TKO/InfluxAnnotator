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
        case types.EDIT_DATABASE:
            return {
                ...state,
                selected: action.index, // Needs to be set for the case of overwriting an existing database
                credentials: state.credentials.map((credential, index) => index === action.index
                                                                            ? action.database
                                                                            : credential
                )
            };
        case types.DELETE_DATABASE:
            return {
                ...state,
                selected: (state.credentials.length === 1) ? undefined : action.index,
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