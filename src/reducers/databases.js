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
            const nextDatabaseList = nextState.get('credentials').push(action.database)
            nextState = nextState.set('selected', state.get('credentials').size);
            nextState = nextState.set('credentials', nextDatabaseList);
            console.log(nextState);
            return nextState;
        case types.EDIT_DATABASE:
            nextState = nextState.set('selected', action.index); // Needs to be set for the case of overwriting an existing database
            nextState = nextState.setIn(['credentials', action.index], action.database)
            console.log(nextState);
            return nextState;
        case types.DELETE_DATABASE:
            // Checking for state of the selected index will be out of boundary
            let selected = nextState.get('selected');

            // If the very last database of the list is to deleted, the index needs to set to the second last database
            if ((nextState.get('credentials').size - 1) === action.index) {
                selected = nextState.get('credentials').size - 2;
            }
            // If the last database will be deleted the selected index needs to be set to undefined
            if (nextState.get('credentials').size === 1) {
                selected = undefined;
            }

            nextState = nextState.set('selected', selected);
            nextState = nextState.deleteIn(['credentials', action.index]);

            console.log(nextState);
            return nextState;

        /*
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