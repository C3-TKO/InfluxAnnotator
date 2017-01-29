import * as types from '../actions/actionTypes';
import { Map, List } from 'immutable';


const initialState = Map(
    {
        selected: undefined,
        credentials: List([])
    }
)

export default function databases(state = initialState, action = {}) {
    console.log(state);
    console.log(action);

    let nextState = state;

    switch (action.type) {
        case types.ADD_DATABASE:
            const nextDatabaseList = state.get('credentials').push(action.database)
            nextState = state.set('selected', state.get('credentials').size);
            nextState = nextState.set('credentials', nextDatabaseList);


            console.log(nextState);
            return nextState;
        /*
        case types.EDIT_DATABASE:
            return {
                ...state,
                selected: action.index, // Needs to be set for the case of overwriting an existing database
                credentials: state.credentials.map((credential, index) => index === action.index
                                                                            ? action.database
                                                                            : credential
                )
            };

        /*
        case types.DELETE_DATABASE:
            // Checking for state of the selected index will be out of boundary
            let selected = state.selected;

            // If the very last database of the list is to deleted, the index needs to set to the second last database
            if ((state.credentials.length - 1) === action.index) {
                selected = state.credentials.length - 2;
            }
            // If the last database will be deleted the selected index needs to be set to undefined
            if (state.credentials.length === 1) {
                selected = undefined;
            }


            return {
                ...state,
                selected: selected,
                credentials: state.credentials.filter((credential, index) => index != action.index)
            };

        case types.SELECT_DATABASE:
            return {
                ...state,
                selected: action.index
            };
            */
        default:
            return state;
    }
}