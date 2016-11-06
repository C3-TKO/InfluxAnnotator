import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableHighlight
} from 'react-native';

class DatabasesView extends Component {
    static defaultProps = {
        id: undefined,
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
            id: this.props.id,
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
    };

    render() {
        return (
            <View style={{padding: 10}}>
                <Text style={{padding: 10, fontSize: 20}}>
                    Databases
                </Text>
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