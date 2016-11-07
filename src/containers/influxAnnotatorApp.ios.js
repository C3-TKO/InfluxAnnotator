'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as databaseActions from '../actions/databaseActions';
import { connect } from 'react-redux';

import { TabBarIOS } from 'react-native';
import WriterView from '../components/writer.ios.js';
import DatabasesView from '../components/databases.ios.js';
import AnnotationsView from '../components/annotations.ios.js';
import Icon from 'react-native-vector-icons/Ionicons';


const TabBarItem = Icon.TabBarItemIOS;

class InfluxAnnotatorApp extends Component {
    static defaultProps = {
        selectedTab: 'annotation-writer'
    };
    
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.selectedTab
        };
    }

    render() {
        const {state, actions} = this.props;

        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarItem
                    title="Databases"
                    iconName="ios-cloud-outline"
                    selectedIconName="ios-cloud"
                    selected={this.state.selectedTab === 'sources'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'sources'
                        });
                    }}>
                    <DatabasesView
                        databases={state.databases}
                        {...actions}
                    />
                </TabBarItem>
                <TabBarItem
                    title="Writer"
                    iconName="ios-pricetag-outline"
                    selectedIconName="ios-pricetag"
                    selected={this.state.selectedTab === 'annotation-writer'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'annotation-writer'
                        });
                    }}>
                    <WriterView/>
                </TabBarItem>
                <TabBarItem
                    iconName="ios-paper-outline"
                    selectedIconName="ios-paper"
                    title="Annotations"
                    selected={this.state.selectedTab === 'annotations'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'annotations'
                        });
                    }}>
                    <AnnotationsView/>
                </TabBarItem>
            </TabBarIOS>
        );
    }
}

export default connect(
    state => ({
        state: {
            databases: state.databases
        }
    }),
    (dispatch) => ({
        actions: bindActionCreators(databaseActions, dispatch)
    })
)(InfluxAnnotatorApp);