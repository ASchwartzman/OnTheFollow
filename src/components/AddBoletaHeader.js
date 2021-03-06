import React, { Component } from 'react'
import {TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Icon, Header, Left, Body, Right, Button, Text, Title } from 'native-base'

export default class AddBoletaHeader extends Component {

    render() {

        return (
                <Header>
                    <Left>
                        <Button transparent
                            onPress={this.props.onCancel}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <Title>{this.props.header}</Title>
                        </TouchableWithoutFeedback>
                    </Body>
                    <Right>
                        <Button hasText transparent
                            onPress={this.props.onSave}>
                            <Text>Salvar</Text>
                        </Button>
                    </Right>
                </Header>
        )
    }
}