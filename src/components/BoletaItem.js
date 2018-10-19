import React, { Component } from 'react'
import { ListItem , Left, Body, Right, Text} from 'native-base'

export default class BoletaItem extends Component {
    render() {
        return (
            <ListItem>
                <Left>
                    <Text>Compra</Text>
                </Left>
                <Body>
                    <Text>Bolsonaro</Text>
                    <Text note>Marcus - 28/12</Text>
                </Body>
                <Right>
                    <Text>55</Text>
                </Right>
            </ListItem>
        )
    }
}