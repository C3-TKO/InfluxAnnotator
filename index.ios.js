import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    TextInput,
    View,
    PickerIOS
} from 'react-native';

const PickerItemIOS = PickerIOS.Item;

class AnnotationWriter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            tag: 'manual'
        };
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <Text style={{padding: 10, fontSize: 42}}>
                    Message
                </Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to the message of the annotation!"
                    onChangeText={(message) => this.setState({message})}
                />
                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.message}
                </Text>
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
                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.tag}
                </Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('InfluxAnnotator', () => AnnotationWriter);