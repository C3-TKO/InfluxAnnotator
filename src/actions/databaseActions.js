import * as types from './actionTypes';

export function addDatabase() {
    return {
        type: types.ADD_DATABASE
    };
}

export function editDatabase(id) {
    return {
        type: types.EDIT_DATABASE,
        id: id
    };
}

export function deleteDatabase(id) {
    return {
        type: types.DELETE_DATABASE,
        id: id
    };
}