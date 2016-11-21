import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
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
        fetch(
            'http://' + database.url + ':' + database.port + '/query?db=' + database.name + '&q=SELECT * FROM ' + database.measurement,
            {
                method: 'GET'
            }
        );
    };

    render() {
        return (
            <View style={{padding: 10}}>
                <TouchableHighlight onPress={this.loadAnnotations}>
                    <Text style={{padding: 10, fontSize: 20}}>
                        Read
                    </Text>
                </TouchableHighlight>
                <Text style={{padding: 10, fontSize: 20}}>
                    Annotations
                </Text>
            </View>
        );
    }
}

export default connect(
    state => ({
        databases: state.databases
    })
)(AnnotationsView);