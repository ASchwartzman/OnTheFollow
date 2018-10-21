import React, { Component } from 'react'
import {TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Container, Header, Left, Body, Right, Button, Text, Title } from 'native-base'

export default class AddBoletaHeader extends Component {

    render() {
        let header = 'Nova Boleta'

        return (
                <Header>
                    <Left>
                        <Button hasText transparent
                            onPress={this.props.onCancel}>
                            <Text>Cancelar</Text>
                        </Button>
                    </Left>
                    <Body>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <Title>{header}</Title>
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