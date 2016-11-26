import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    Text,
    ListView,
    TouchableHighlight
} from 'react-native';

class AnnotationsView extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    loadAnnotations = () => {
        const database = this.props.databases.credentials[this.props.databases.selected];
        return fetch(
            'http://' + database.url + ':' + database.port + '/query?db=' + database.name + '&q=SELECT * FROM ' + database.measurement,
            {
                method: 'GET'
            }
        )
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.results[0].series[0].values);
            return responseJson.results[0].series[0].values;
        })
        .catch((error) => {
            console.error(error)
        });
    };

    renderAnnotations = () => {
        const annotations = this.loadAnnotations();

        console.log(annotations);

        /*
        [
            [ '2016-11-24T20:11:00Z', 'Test', 'manual' ],
            [ '2016-11-24T20:12:00Z', 'Booyakasha', 'manual' ],
            [ '2016-11-24T20:12:00.154Z', 'Test', 'manual' ]
        ]
        */

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return (
            <ListView>
                dataSource={ds.cloneWithRows(annotations)}
                renderRow={(rowData) => <Text>{rowData[0] + rowData[1] + rowData[2]}</Text>}
            </ListView>
        )

    };

    render() {
        return (
            <ScrollView style={{padding: 10}}>
                <TouchableHighlight onPress={this.loadAnnotations}>
                    <Text style={{padding: 10, fontSize: 20}}>
                        Read
                    </Text>
                </TouchableHighlight>
                <Text style={{padding: 10, fontSize: 20}}>
                    Annotations
                </Text>
                {this.renderAnnotations()}
            </ScrollView>
        );
    }
}

export default connect(
    state => ({
        databases: state.databases
    })
)(AnnotationsView);