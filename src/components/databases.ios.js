import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    PickerIOS,
    TouchableHighlight
} from 'react-native';

const PickerItemIOS = PickerIOS.Item;

class DatabasesView extends Component {
    static defaultProps = {
        index: undefined,
        url: undefined,
        alias: undefined,
        port: 8086,
        name: undefined,
        measuremnt: undefined,
        username: undefined,
        password: undefined
    };

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            url: this.props.url,
            alias: this.props.alias,
            port: this.props.port,
            name: this.props.name,
            measurement: this.props.measurement,
            username: this.props.username,
            password: this.props.password
        };
    }

    onPressButton = () => {
        fetch(
            'http://' + this.state.url + ':' + this.state.port + '/query?db=' + this.state.name + '&q=SELECT%20*%20FROM%20' + this.state.measurement + '%20LIMIT%201',
            {
                method: 'GET'
            }
        );

        const database = {
            url: this.state.url,
            alias: this.state.alias,
            port: this.state.port,
            name: this.state.name,
            measurement: this.state.measurement,
            username: this.state.username,
            password: this.state.password
        }

        if( this.state.index ) {
            this.props.editDatabase(this.state.index, database);
        }
        else {
            this.props.addDatabase(database);
        }
    };

    renderDatabasePicker() {
        if ( this.props.databases.length > 0 ) {
            return (
                <PickerIOS
                    selectedValue={0}
                    onValueChange={(index) => this.setState({index})}>
                    <PickerItemIOS
                        key='index'
                        value={0}
                        label='manual'
                    />
                </PickerIOS>
            )
        }

    }

    render() {
        let databasePicker = null;
        if ( this.props.databases.length > 0 ) {
            databasePicker = (
                <PickerIOS
                    selectedValue={0}
                    onValueChange={(index) => this.setState({index})}>
                    <PickerItemIOS
                        key='index'
                        value={0}
                        label='manual'
                    />
                    <PickerItemIOS
                        key='index'
                        value={1}
                        label='test'
                    />
                    <PickerItemIOS
                        key='index'
                        value={2}
                        label='test2'
                    />
                </PickerIOS>
            );
        }

        return (
            <View style={{padding: 10}}>
                <Text style={{padding: 10, fontSize: 20}}>
                    Databases
                </Text>
                {databasePicker}
                <TextInput
                    style={{height: 20}}
                    placeholder="Alias for the database"
                    onChangeText={(alias) => this.setState({alias})}
                />
                <TextInput
                    style={{height: 20}}
                    placeholder="url"
                    onChangeText={(url) => this.setState({url})}
                />
                <TextInput
                    style={{height: 20}}
                    placeholder="port"
                    onChangeText={(port) => this.setState({port})}
                />
                <TextInput
                    style={{height: 20}}
                    placeholder="Database name"
                    onChangeText={(name) => this.setState({name})}
                />
                <TextInput
                    style={{height: 20}}
                    placeholder="Measurement"
                    onChangeText={(measurement) => this.setState({measurement})}
                />
                <TextInput
                    style={{height: 20}}
                    placeholder="Username"
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                    style={{height: 20}}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password})}
                />
                <TouchableHighlight onPress={this.onPressButton}>
                    <Text style={{padding: 10, fontSize: 20}}>
                        (Test &) Save
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = DatabasesView;