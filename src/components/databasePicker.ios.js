import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        if(typeof this.state.index == 'undefined' && nextProps.databases.length > 0) {
            this.setState({index: 0})
        }
        if(this.state.index > nextProps.databases.length - 1) {
            this.setState({index: nextProps.databases.length - 1})
        }
    }

    render() {
        let databasePicker = null;
        if ( this.props.databases.length > 0 ) {
            databasePicker = (
                <PickerIOS
                    selectedValue={this.state.index}
                    onValueChange={(index) => this.setState({index})}>
                    {this.props.databases.map((database, index) =>
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
    })
)(DatabasePickerIOS);