import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import {
    Icon, Container, Content, Text, ListItem, Badge
} from 'native-base'

export default class EventosList extends Component {

    _selecionarEvento = id => {

        this.props.navigation.navigate('WalletScreen',{
            selectEventoId: id,
        })
    }

    render() {
        eventos_lista = this.props.navigation.getParam('eventos_lista')
        return (
            <Container>
                <Content>
                    <FlatList
                        keyExtractor={(item, index) => `${item.id}`}
                        data={eventos_lista}
                        renderItem={({item}) => 
                            <ListItem style={{justifyContent:'space-between'}}
                                onPress={() => this._selecionarEvento(item.id)}>
                                <View style={{flexDirection:'row'}}>
                                    <Text>                    
                                        {item.titulo  }
                                    </Text>
                                    <Badge primary style={{marginLeft:10}}>
                                        {item.num_boletas == 1 ? 
                                            (<Text>{item.num_boletas} boleta</Text>) : (<Text>{item.num_boletas} boletas</Text>)}
                                        
                                    </Badge>
                                </View>
                                <Icon type='FontAwesome' name='angle-right' style={styles.rightArrow}/>
                            </ListItem>
                        }/>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    rightArrow: {
        color:'lightgrey'
    }
})