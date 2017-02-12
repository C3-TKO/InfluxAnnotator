import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    TextInput,
    ScrollView,
    Picker,
    TouchableInput
} from 'react-native';
import DatabasePicker from './databasePicker'
import {
    InputGroup,
    InputAddRow,
    SectionHeader,
    Base,
    ButtonGroup,
    Button,
    TouchableRow
} from 'panza'

import RemovableInput from './panza-migrations/removableInput';
import InputRow from './panza-migrations/inputRow';
import { Actions, ActionConst } from 'react-native-router-flux';

const GreenPlusIcon = () => (
    <Base
        backgroundColor='green'
        mr={2}
        style={styles.iconButton}
    >
        <Icon
            name='md-add'
            size={15}
            color='white'
        />
    </Base>
);

class EditorView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.annotation.title,
            text: props.annotation.text,
            tags: (typeof props.annotation.tags === 'string') ? props.annotation.tags.split(' ') : [],
            time: new Date(props.annotation.time)
        };
    }

    dateTimeLocalOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };

    onPressButton = () => {
        console.log(this.props);
        /*
        const database = this.props.databases.credentials[this.props.databases.selected];
        let body = database.measurement + ' title="' + this.state.title + '",text="' + this.state.text + '"';
        if (this.state.tags.length > 0) {
            body += ',tags="' + this.state.tags.reduce((a, b) => a + ' ' + b) + '"';
        }
        if (!this.state.useNow) {
            body +=  ' + (this.state.date.getTime() * 1000000)';
        }
        fetch(
            'http://' + database.url + ':' + database.port + '/write?db=' + database.name,
            {
                method: 'POST',
                body: body
            }
        );
        */
    };

    onPressDeleteButton = async() => {
        const database = this.props.databases.credentials[this.props.databases.selected];

        console.log(this.props.annotation.time);


        const query = "DELETE FROM " + database.measurement + " WHERE time = '" + this.props.annotation.time + "'";

        try {
            const response = await fetch('http://' + database.url + ':' + database.port + '/query?db=' + database.name + '&q=' + query);
            const json = await response.json();
            Actions.inbox(
                {
                    type: ActionConst.RESET,
                    reloadAnnotations: true
                }
            );
        } catch(error) {
            throw error;
        }
    }

    onRemoveTag = (indexOfRemovedTag) => {
        this.setState({tags: this.state.tags.filter((tag, index) => index != indexOfRemovedTag)})
    }

    onChangeTag = (changedTag, indexOfChangedTag) => {
        this.setState({tags: this.state.tags.map((tag, index) => index === indexOfChangedTag ? changedTag : tag)});
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#fafafa', paddingTop: 64}}>
                <InputGroup>
                    <InputRow
                        style={{backgroundColor: '#ffffff'}}
                        label='Title'
                        value={this.state.title}
                        placeholder='Annotation title'
                        onChangeText={(title) => this.setState({ title })}
                    />
                    <InputRow
                        style={{backgroundColor: '#ffffff'}}
                        label='Date'
                        value={new Date(this.state.time).toLocaleDateString('en-US', this.dateTimeLocalOptions)}
                        editable={false}
                    />
                    <TextInput
                        style={{height: 120, borderColor: 'gray', fontSize: 17, paddingLeft: 16, paddingRight: 16, backgroundColor: '#ffffff'}}
                        placeholder="Type here to write the text of the annotation"
                        onChangeText={(text) => this.setState({text})}
                        multiline={true}
                        value={this.state.text}
                    />
                </InputGroup>

                <SectionHeader>TAGS (OPTIONAL)</SectionHeader>
                <InputGroup>
                    <InputAddRow
                        label='Add a tag'
                        onPress={() => this.setState({ tags: ['New-tag', ...this.state.tags]})}
                    />
                    {this.state.tags.map((tag, index) =>
                        <RemovableInput
                            key={index}
                            removable
                            onRequestRemove={() => this.onRemoveTag(index)}
                            onSelectLabel={noop}
                            onPress={noop}
                            onChangeText={(text) => this.onChangeTag(text, index)}
                            value={tag}
                        />
                    )}
                </InputGroup>

                <Base mt={2} p={2}>
                    <ButtonGroup mt={2} vertical>
                        <Button mb={1}
                            primary
                            onPress={this.onPressButton}
                        >
                            Edit
                        </Button>
                        <Button mb={4}
                            negative
                            onPress={this.onPressDeleteButton}
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </Base>
            </ScrollView>
        );
    }
}

export default connect(
    state => ({
        databases: state.databases
    })
)(EditorView);