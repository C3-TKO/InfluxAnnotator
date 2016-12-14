import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    Text,
    TouchableHighlight
} from 'react-native';

import { TouchableRow } from 'panza';

class AnnotationsView extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            annotations: []
        };
    }

    loadAnnotations = () => {
        const database = this.props.databases.credentials[this.props.databases.selected];
        return fetch(
            'http://' + database.url + ':' + database.port + '/query?db=' + database.name + '&q=SELECT * FROM ' + database.measurement + ' ORDER BY time DESC LIMIT 50',
            {
                method: 'GET'
            }
        )
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.results[0].series[0].values);

            this.setState({
                annotations: responseJson.results[0].series[0].values
            })
        })
        .catch((error) => {
            console.error(error)
        });
    };

    renderAnnotations = () => {
        return (
            <Text>
                TEST
            </Text>
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
                {this.state.annotations.map((annotation, index) =>
                    <TouchableRow
                        onPress={noop}
                        primaryText='Title'
                        secondaryText={annotation[1]}
                        value={annotation[2]}
                    />
                )}
            </ScrollView>
        );
    }
}

export default connect(
    state => ({
        databases: state.databases
    })
)(AnnotationsView);