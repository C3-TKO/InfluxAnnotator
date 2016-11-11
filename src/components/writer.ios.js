import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
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
        fetch(
            'http://192.168.3.155:8086/write?db=influx-annotator',
            {
                method: 'POST',
                body: 'annotations,type=' + this.state.tag + ' message="' + this.state.message + '" ' + (this.state.date.getTime() * 1000000)
            }
        );
    };

    render() {
        return (
            <View style={{padding: 10}}>
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

                <TouchableHighlight onPress={this.onPressButton}>
                    <Text style={{padding: 10, fontSize: 20}}>
                        Annotate!
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = WriterView;