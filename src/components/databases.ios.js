import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as databaseActions from '../actions/databaseActions';
import {
    Text,
    TextInput,
    ScrollView,
    AlertIOS,
    TouchableHighlight
} from 'react-native';
import DatabasePicker from './databasePicker'
import databaseIncompleteException from '../exceptions/databaseIncompleteException';
import aliasAlreadyInUseException from '../exceptions/aliasAlreadyInUseException'
import InputRow from './panza-migrations/inputRow';

class DatabasesView extends Component {
    static defaultProps = {
        index: undefined,
        url: undefined,
        alias: undefined,
        port: '8086',
        name: undefined,
        measuremnt: undefined,
        username: undefined,
        password: undefined
    };

    constructor(props) {
        super(props);
        if(typeof props.databases.selected !== undefined) {
            this.state = {
                ...props.databases.credentials[props.databases.selected]
            }
        }

        else {
            this.state = {
                index: this.props.index,
                url: this.props.url,
                alias: this.props.alias,
                port: this.props.port,
                name: this.props.name,
                measurement: this.props.measurement,
                username: this.props.username,
                password: this.props.password
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if(typeof nextProps.databases.selected !== 'undefined') {
            const database = nextProps.databases.credentials[nextProps.databases.selected];

            this.setState ({
                index: database.index,
                url: database.url,
                alias: database.alias,
                port: database.port,
                name: database.name,
                measurement: database.measurement,
                username: database.username,
                password: database.password
            })
        }
    }

    getDatabaseFromState = () => {
        return {
            url: this.state.url,
            alias: this.state.alias,
            port: this.state.port,
            name: this.state.name,
            measurement: this.state.measurement,
            username: this.state.username,
            password: this.state.password
        }
    }

    checkAliasAlreadyExisting = (indexOfCurrentlyEditedDatabase) => {
        this.props.databases.credentials.map((database, index) => {
            if (database.alias == this.state.alias && indexOfCurrentlyEditedDatabase !== index) {
                throw new aliasAlreadyInUseException(this.state.alias, index);
            }
        })
    }

    checkCredentialsCompleteness = () => {
        const database = this.getDatabaseFromState();

        for(var property in database) {
            if(database.hasOwnProperty(property)) {
                if (typeof database[property] === 'undefined') {
                    throw new databaseIncompleteException(property);
                }
            }
        }
    }

    testCredentials = () => {
        fetch(
            'http://' + this.state.url + ':' + this.state.port + '/query?db=' + this.state.name + '&q=SELECT%20*%20FROM%20' + this.state.measurement + '%20LIMIT%201',
            {
                method: 'GET'
            }
        );
    }

    writeDatabase = (index) => {
        const database = this.getDatabaseFromState();

        try {
            this.checkCredentialsCompleteness();
            //this.testCredentials();
            this.checkAliasAlreadyExisting(index);
        }
        catch (e) {
            if (e instanceof databaseIncompleteException) {
                AlertIOS.alert(
                    'Database incomplete',
                    e.message
                );
                return
            }
            if (e instanceof aliasAlreadyInUseException) {
                AlertIOS.alert(
                    'Conflict',
                    e.message,
                    [
                        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                        {text: 'Overwrite', onPress: () => this.props.actions.editDatabase(e.index, database), style: 'destructive'}
                    ]
                );
                return
            }
        }

        if (typeof index === 'undefined') {
            this.props.actions.addDatabase(database);
        }
        else {
            this.props.actions.editDatabase(index, database);
        }
    }

    onPressAddButton = () => {
        this.writeDatabase();
    }

    onPressEditButton = () => {
        this.writeDatabase(this.props.databases.selected)
    }

    onPressDeleteButton = () => {
        this.props.actions.deleteDatabase(this.props.databases.selected);
    }

    onPressAddDummyDataButton = () => {
        this.setState(
            {
                url: 'localhost',
                alias: 'local-influx_annotator',
                port: '8086',
                name: 'influx_annotator',
                measurement: 'annotations',
                username: 'root',
                password: 'root'
            }
        )
    }

    renderEditButton = () => {
        if(typeof this.props.databases.selected !== 'undefined') {
            return (
                <TouchableHighlight onPress={this.onPressEditButton}>
                    <Text style={{padding: 10, fontSize: 20}}>
                        Edit {this.props.databases.credentials[this.props.databases.selected].alias}
                    </Text>
                </TouchableHighlight>
            )
        }
    }

    renderDeleteButton = () => {
        if(this.props.databases.credentials.length > 0) {
            return (
                <TouchableHighlight onPress={this.onPressDeleteButton}>
                    <Text style={{padding: 10, fontSize: 20}}>
                        Delete
                    </Text>
                </TouchableHighlight>
            )
        }
    }

    render() {
        return (
            <ScrollView style={{padding: 10}}>
                <Text style={{padding: 10, fontSize: 20}}>
                    Databases
                </Text>
                <DatabasePicker/>

                <InputRow
                    label='Alias'
                    placeholder='Alias for the database'
                    value={this.state.alias}
                    onChangeText={(alias) => this.setState({ alias })} />
                <InputRow
                    label='Url'
                    placeholder='url'
                    value={this.state.url}
                    onChangeText={(url) => this.setState({ url })} />
                <InputRow
                    label='Port'
                    placeholder='8083'
                    value={this.state.port}
                    onChangeText={(port) => this.setState({ port })} />
                <InputRow
                    label='Database name'
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })} />
                <InputRow
                    label='Measurement'
                    placeholder='annotations'
                    value={this.state.measurement}
                    onChangeText={(measurement) => this.setState({ measurement })} />
                <InputRow
                    label='User'
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })} />
                <InputRow
                    label='Password'
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })} />

                <TouchableHighlight onPress={this.onPressAddButton}>
                    <Text style={{padding: 10, fontSize: 20}}>
                        (Test &) Save
                    </Text>
                </TouchableHighlight>
                {this.renderEditButton()}
                {this.renderDeleteButton()}
                <TouchableHighlight onPress={this.onPressAddDummyDataButton}>
                    <Text style={{padding: 10, fontSize: 20}}>
                        Add Dummy Data
                    </Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

export default connect(
    state => ({
        databases: state.databases
    }),
    (dispatch) => ({
        actions: bindActionCreators(databaseActions, dispatch)
    })
)(DatabasesView);