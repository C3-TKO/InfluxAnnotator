import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

class Annotations extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <Text style={{padding: 10, fontSize: 20}}>
                    Annotations
                </Text>
            </View>
        );
    }
}

module.exports = Annotations;