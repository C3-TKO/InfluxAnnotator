import React, { Component } from 'react';
import { connect } from 'react-redux';
import InboxRow from './inbboxRow';
import {
    AlertIOS,
    ScrollView,
    View,
    Text,
    TouchableHighlight,
    RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';

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

    componentWillReceiveProps(nextProps) {
        if(nextProps.reloadAnnotations) {
            this.loadAnnotations()
        }
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
            AlertIOS.alert(
                error.message,
                'Database ' + this.props.databases.credentials[this.props.databases.selected].alias + ' is not reachable.'
            );
            this.setState({isRefreshing: false});
        });
    };

    renderFilledInbox() {
        return (
            <ScrollView
                style={{
                    backgroundColor: '#fafafa',
                    marginTop: 20
                }}
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
                {this.state.annotations.map((annotation, index) => {
                    const goToAnnotationViewer = () => Actions.viewer(
                        {
                            annotation: {
                                title: annotation[1],
                                time: annotation[0],
                                text: annotation[2],
                                tags: annotation[3]
                            },
                            reloadAnnotations: this.loadAnnotations
                        }
                    );
                    return (
                        <InboxRow
                            key={index}
                            onPress={goToAnnotationViewer}
                            title={annotation[1]}
                            time={annotation[0]}
                            text={annotation[2]}
                            tags={annotation[3]}
                            value={'test'}
                        />
                    )}
                )}
            </ScrollView>
        );
    }

    renderEmptyInbox() {
        return (
            <View
                style={{
                    backgroundColor: '#fafafa',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        width: 250,
                        textAlign: 'center',
                        fontSize: 17,
                        color: '#8F8E94'
                    }}
                >There are no annotations to be found yet!</Text>
            </View>
        );
    }

    render() {
        if (this.state.annotations.length > 0) {
            return this.renderFilledInbox()
        }
        else {
            return this.renderEmptyInbox()
        }
    }
}

export default connect(
    state => ({
        databases: state.databases
    })
)(AnnotationsView);