import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import InfluxAnnotatorApp from './influxAnnotatorApp.ios';

const initialState = {};

const store = createStore(
    combineReducers(reducers),
    {},
    compose(
        autoRehydrate()
        //applyMiddleware(thunk)
    )
)

persistStore(store, {storage: AsyncStorage}, () => {});
//persistStore(store, {storage: AsyncStorage}, () => {}).purge();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <InfluxAnnotatorApp />
            </Provider>
        );
    }
}