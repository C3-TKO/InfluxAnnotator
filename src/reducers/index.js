import databases from './databases';
import Record from 'immutable';
import { combineReducers } from 'redux-immutable';

const reducers = {
    database: databases
};
module.exports = combineReducers(reducers);


