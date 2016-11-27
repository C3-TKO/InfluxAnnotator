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
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                [ '2016-11-24T20:11:00Z', 'Test', 'manual' ]
            ])
        };
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

            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            this.setState({
                dataSource: ds.cloneWithRows(
                    responseJson.results[0].series[0].values
                )
            })

        })
        .catch((error) => {
            console.error(error)
        });
    };

    renderAnnotations = () => {
        //const annotations = this.loadAnnotations();

        //console.log(annotations);

        /*
         [
         [ '2016-11-24T20:11:00Z', 'Test', 'manual' ],
         [ '2016-11-24T20:12:00Z', 'Booyakasha', 'manual' ],
         [ '2016-11-24T20:12:00.154Z', 'Test', 'manual' ]
         ]
         */

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {console.log(rowData); return(<Text>{rowData}</Text>)}}
            />
        )

    };

    render() {
        return (
            <ScrollView>
                <TouchableHighlight onPress={this.loadAnnotations}>
                    <Text style={{padding: 10, fontSize: 20}}>
                        Read
                    </Text>
                </TouchableHighlight>
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