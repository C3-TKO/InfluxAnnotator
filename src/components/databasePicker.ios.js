import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as databaseActions from '../actions/databaseActions';
import {
    PickerIOS
} from 'react-native';

const PickerItemIOS = PickerIOS.Item;

class DatabasePickerIOS extends Component {
    static defaultProps = {
        index: undefined
    }

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index
        };
    }

    componentWillReceiveProps(nextProps) {
        if(typeof this.state.index == 'undefined' && nextProps.databases.credentials.length > 0) {
            this.setState({index: 0})
        }
        if(this.state.index > nextProps.databases.credentials.length - 1) {
            this.setState({index: nextProps.databases.credentials.length - 1})
        }
    }

    render() {
        let databasePicker = null;
        if ( this.props.databases.credentials.length > 0 ) {
            databasePicker = (
                <PickerIOS
                    selectedValue={this.state.index}
                    onValueChange={(index) => this.setState({index})}>
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
)(DatabasePickerIOS);