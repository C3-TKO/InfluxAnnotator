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
import * as InfluxExceptions from '../exceptions/influxExceptions';
import {
    SectionHeader,
    InputGroup,
    Base,
    ButtonGroup,
    Button
} from 'panza';
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
                throw new InfluxExceptions.AliasAlreadyInUseException(this.state.alias, index);
            }
        })
    }

    checkCredentialsCompleteness = () => {
        const database = this.getDatabaseFromState();

        for(var property in database) {
            if(database.hasOwnProperty(property)) {
                if (typeof database[property] === 'undefined') {
                    throw new InfluxExceptions.DatabaseConfigurationIncompleteException(property);
                }
            }
        }
    }

    checkDatabaseConnection = async () => {
        try {
            const response = await fetch('http://' + this.state.url + ':' + this.state.port + '/query?db=' + this.state.name + '&q=SHOW%20MEASUREMENTS');
            const json = await response.json();
            return json;
        } catch(error) {
            throw new InfluxExceptions.HostNotFoundException(error);
        }
    }

    checkDatabaseExistence(json) {
        if (typeof json.results[0].series === 'undefined') {
            throw new InfluxExceptions.DatabaseNotFoundException();
        }
    }

    checkMeasurementExistence(json) {
        let measurementIsExisting = false;
        json.results[0].series[0].values[0].map(
            (measurement) => {
                if (measurement === this.state.measurement) {
                    measurementIsExisting = true
                }
            });

        if(!measurementIsExisting) {
            throw new InfluxExceptions.MeasurementNotFoundException();
        }
    }

    writeDatabase = async (index) => {
        const database = this.getDatabaseFromState();

        // Pre-write operation checks
        try {
            this.checkCredentialsCompleteness();
            this.checkAliasAlreadyExisting(index);
            const influxResult = await this.checkDatabaseConnection();
            this.checkDatabaseExistence(influxResult);
            this.checkMeasurementExistence(influxResult);
        }
        catch (e) {
            if (e instanceof InfluxExceptions.HostNotFoundException ||
                e instanceof InfluxExceptions.DatabaseConfigurationIncompleteException ||
                e instanceof InfluxExceptions.DatabaseNotFoundException) {
                AlertIOS.alert(
                    e.title,
                    e.message
                );
            }
            if (e instanceof InfluxExceptions.AliasAlreadyInUseException ||
                e instanceof InfluxExceptions.MeasurementNotFoundException) {
                AlertIOS.alert(
                    e.title,
                    e.message,
                    [
                        {
                            text: 'Cancel', onPress: () => {}, style: 'cancel'},
                        {
                            text: 'Continue', onPress: () => {
                                if (typeof index === 'undefined') {
                                    this.props.actions.addDatabase(database);
                                    }
                                else {
                                    this.props.actions.editDatabase(index, database);
                                }},
                            style: 'destructive'
                        }
                    ]
                );
            }

            return false;
        }

        // Writing to store
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

    saveAsButton = (
        <Button
            primary
            onPress={this.onPressAddButton}
        >
            Save as new database
        </Button>
    );

    editButton = (
        <Button
            primary
            onPress={this.onPressEditButton}
            mt={1}
        >
            Edit
        </Button>
    );

    deleteButton = (
        <Button
            negative
            onPress={this.onPressDeleteButton}
            mt={1}
        >
            Delete
        </Button>
    )

    addDummyDataButton = (
        <Button
            mt={1}
            onPress={this.onPressAddDummyDataButton}
        >
            Add dummy data
        </Button>
    );

    renderButtons = () => {
        if(typeof this.props.databases.selected !== 'undefined') {
            return (
                <Base mt={2} p={2}>
                    <ButtonGroup mt={2} vertical>
                        {this.saveAsButton}
                        {this.editButton}
                        {this.deleteButton}
                        {this.addDummyDataButton}
                    </ButtonGroup>
                </Base>
            )
        }

        return (
            <Base mt={2} p={2}>
                <ButtonGroup mt={2} vertical>
                    {this.saveAsButton}
                    {this.addDummyDataButton}
                </ButtonGroup>
            </Base>
        )
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#fafafa' }}>
                <SectionHeader>
                    DATABASE CONFIGURATIONS
                </SectionHeader>
                <InputGroup>
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
                </InputGroup>

                {this.renderButtons()}
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