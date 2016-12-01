import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    TextInput,
    ScrollView,
    PickerIOS,
    TouchableHighlight,
    LayoutAnimation
} from 'react-native';
import DatabasePickerIOS from './databasePicker.ios'

import { InputDatePicker } from 'panza'

const PickerItemIOS = PickerIOS.Item;

class WriterView extends Component {
    static defaultProps = {
        date: new Date(),
        tag: 'manual'
    };

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            tag: this.props.tag,
            date: this.props.date,
            focusDate: false
        };
    }

    dateTimeLocalOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };

    onPressButton = () => {
        const database = this.props.databases.credentials[this.props.databases.selected];
        fetch(
            'http://' + database.url + ':' + database.port + '/write?db=' + database.name,
            {
                method: 'POST',
                body: database.measurement + ',type=' + this.state.tag + ' message="' + this.state.message + '" ' + (this.state.date.getTime() * 1000000)
            }
        );
    };

    render() {
        return (
            <ScrollView style={{padding: 10}}>
                <TouchableHighlight onPress={this.onPressButton}>
                    <Text style={{padding: 10, fontSize: 20}}>
                        Annotate!
                    </Text>
                </TouchableHighlight>


                <InputDatePicker
                    hasFocus={this.state.showDate}
                    label={'Time'}
                    onRequestFocus={() => {
                        this.setState({ showDate: true })
                    }}
                    onRequestClose={() => {
                        this.setState({ showDate: false })
                    }}
                    onDateChange={(date) => {
                        this.setState({ date })
                    }}
                    value={new Date(this.state.date).toLocaleDateString('en-US', this.dateTimeLocalOptions)}
                    date={this.state.date}
                    expanded={this.state.focusDate}
                    onToggleExpansion={() => {
                        LayoutAnimation.linear()
                        this.setState({ focusDate: !this.state.focusDate })
                    }}

                />


                <Text style={{padding: 10, fontSize: 20}}>
                    Message
                </Text>



                <TextInput
                    style={{height: 20}}
                    placeholder="Type here to write the message of the annotation!"
                    onChangeText={(message) => this.setState({message})}
                />
                <DatabasePickerIOS/>
                <PickerIOS
                    selectedValue={this.state.tag}
                    onValueChange={(tag) => this.setState({tag})}>
                    <PickerItemIOS
                        key='manual'
                        value='manual'
                        label='manual'
                    />
                    <PickerItemIOS
                        key='live-deploy'
                        value='live-deploy'
                        label='live-deploy'
                    />
                </PickerIOS>

            </ScrollView>
        );
    }
}

export default connect(
    state => ({
        databases: state.databases
    })
)(WriterView);