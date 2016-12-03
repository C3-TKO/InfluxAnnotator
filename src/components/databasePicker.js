import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as databaseActions from '../actions/databaseActions';
import {
    Picker
} from 'react-native';
import {
    InputPicker
} from 'panza'

class DatabasePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focusPicker: false
        };
    }

    render() {
        let databasePicker = null;
        if ( this.props.databases.credentials.length > 0 ) {
            databasePicker = (
                <InputPicker
                    expanded={this.state.focusPicker}
                    value={this.props.databases.credentials[this.props.databases.selected].alias}
                    label='Database'
                    editable={this.state.editable}
                    onToggleExpansion={() => {
                        this.setState({ focusPicker: !this.state.focusPicker })
                    }}
                >
                    <Picker
                        prompt='Database'
                        style={{ width: 300 }}
                        selectedValue={this.props.databases.selected}
                        onValueChange={(index) => this.props.actions.selectDatabase(index)}>
                        {this.props.databases.credentials.map((database, index) =>
                            <Picker.Item
                                key={index}
                                value={index}
                                label={database.alias}
                            />
                        )}
                    </Picker>
                </InputPicker>
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