import React, { Component } from 'react';
import {
    AppRegistry,
    TabBarIOS,
} from 'react-native';

import WriterView from './writer.ios.js';
import DatabasesView from './databases.ios.js';
import AnnotationsView from './annotations.ios.js';
import Icon from 'react-native-vector-icons/Ionicons';

//const TabBarItem = TabBarIOS.Item;
const TabBarItem = Icon.TabBarItemIOS;

class InfluxAnnotator extends Component {
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
                    <DatabasesView/>
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

AppRegistry.registerComponent('InfluxAnnotator', () => InfluxAnnotator);