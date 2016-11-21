import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    TextInput,
    ScrollView,
    PickerIOS,
    DatePickerIOS,
    TouchableHighlight
} from 'react-native';
import DatabasePickerIOS from './databasePicker.ios'

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
            date: this.props.date
        };
    }

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
                <DatePickerIOS
                    date={this.state.date}
                    mode="datetime"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={(date) => this.setState({date})}
                />
            </ScrollView>
        );
    }
}

export default connect(
    state => ({
        databases: state.databases
    })
)(WriterView);