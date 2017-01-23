import React, { Component } from 'react';
import { connect } from 'react-redux';
import InboxRow from './inbboxRow';
import {
    ScrollView,
    Text,
    TouchableHighlight,
    RefreshControl
} from 'react-native';

import { TouchableRow } from 'panza';

class AnnotationsView extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            annotations: [],
            isRefreshing: false
        };
    }

    componentDidMount() {
        this.loadAnnotations();
    }

    loadAnnotations = () => {
        this.setState({isRefreshing: true});
        const database = this.props.databases.credentials[this.props.databases.selected];
        return fetch(
            'http://' + database.url + ':' + database.port + '/query?db=' + database.name + '&q=SELECT title, text, tags, time FROM ' + database.measurement + ' ORDER BY time DESC LIMIT 50',
            {
                method: 'GET'
            }
        )
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                annotations: responseJson.results[0].series[0].values
            })
            this.setState({isRefreshing: false});
        })
        .catch((error) => {
            console.error(error);
            this.setState({isRefreshing: false});
        });
    };

    render() {
        return (
            <ScrollView
                style={{backgroundColor: '#fafafa' }}
                refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.loadAnnotations}
                    tintColor="#000000"
                    title="Loading..."
                    titleColor="#000000"
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#ffff00"
                />}
            >
                {this.state.annotations.map((annotation, index) =>
                    <InboxRow
                        key={index}
                        onPress={noop}
                        title={annotation[1]}
                        time={annotation[0]}
                        text={annotation[2]}
                        tags={annotation[3]}
                        value={'test'}
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