import React, { Component } from 'react';
import {
    AppRegistry,
    TabBarIOS
} from 'react-native';

import AnnotationWriter from './annotation-writer.ios';
import Sources from './sources.ios';
import Annotations from './annotations.ios';

const TabBarItem = TabBarIOS.Item;

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
                    selected={this.state.selectedTab === 'sources'}
                    systemIcon='favorites'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'sources'
                        });
                    }}>
                    <Sources/>
                </TabBarItem>
                <TabBarItem
                    selected={this.state.selectedTab === 'annotation-writer'}
                    systemIcon='recents'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'annotation-writer'
                        });
                    }}>
                    <AnnotationWriter/>
                </TabBarItem>
                <TabBarItem
                    selected={this.state.selectedTab === 'annotations'}
                    systemIcon='search'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'annotations'
                        });
                    }}>
                    <Annotations/>
                </TabBarItem>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('InfluxAnnotator', () => InfluxAnnotator);