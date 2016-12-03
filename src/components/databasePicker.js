import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as databaseActions from '../actions/databaseActions';
import {
    PickerIOS
} from 'react-native';

const PickerItemIOS = PickerIOS.Item;

class DatabasePicker extends Component {

    render() {
        let databasePicker = null;
        if ( this.props.databases.credentials.length > 0 ) {
            databasePicker = (
                <PickerIOS
                    selectedValue={this.props.databases.selected}
                    onValueChange={(index) => this.props.actions.selectDatabase(index)}>
                    {this.props.databases.credentials.map((database, index) =>
                        <PickerItemIOS
                            key={index}
                            value={index}
                            label={database.alias}
                        />
                    )}
                </PickerIOS>
            );
        }

        return(databasePicker);
    }
}

export default connect(
    state => ({
        databases: state.databases
    }),
    (dispatch) => ({
        actions: bindActionCreators(databaseActions, dispatch)
    })
)(DatabasePicker);