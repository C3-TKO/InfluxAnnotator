import * as types from './actionTypes';

export function addDatabase(database) {
    return {
        type: types.ADD_DATABASE,
        database: database
    };
}

export function editDatabase(index, database) {
    return {
        type: types.EDIT_DATABASE,
        index: index,
        database: database
    };
}

export function deleteDatabase(index) {
    return {
        type: types.DELETE_DATABASE,
        index: index
    };
}

export function selectDatabase(index) {
    return {
        type: types.SELECT_DATABASE,
        index: index
    };
}