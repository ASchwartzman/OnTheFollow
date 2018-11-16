import React, { Component } from 'react'
import { FlatList, StyleSheet, View, TouchableHighlight } from 'react-native'
import {
    Icon, Container, Content, Text, ListItem, Badge, Button
} from 'native-base'
import Swipeable from 'react-native-swipeable'

export default class EventosList extends Component {

    static navigationOptions = ({ navigation }) => {

        _backButton = () => {
            eventos_lista = navigation.getParam('eventos_lista')
            const eventos_id = []
            eventos_lista.forEach(evento => {
                eventos_id.push(evento.id)
            })
            navigation.state.params.onNavigateBack(eventos_id)
            navigation.navigate('WalletScreen')
        }

        return {
          headerLeft: (
            <Button transparent
              onPress={() => this._backButton()}>
                <Icon name='arrow-back' />
            </Button>
          ),
        }
    }

    constructor(props){
        super(props)
        this.state = {
            scroll: true,
            eventos_lista: this.props.navigation.getParam('eventos_lista'),
        }
    }

    _selecionarEvento = id => {

        this.props.navigation.navigate('WalletScreen',{
            selectEventoId: id,
        })
    }

    _removeEvento = id => {
        let eventos_lista = this.state.eventos_lista.filter(evento => evento.id != id)
        this.setState({eventos_lista}, () =>  this.props.navigation.setParams({eventos_lista}))
    }

    renderRightButtons = item => {
        return [
            <TouchableHighlight onPress={() => this._removeEvento(item.id)}>
                <View style={styles.rightButton1}>
                    <Icon style={{fontSize: 30, color:'white'}} name='trash'/>
                </View>
            </TouchableHighlight>
            ]
    }

    _renderItem = item => {
        return (
            <Swipeable
                    rightButtons={this.renderRightButtons(item)}
                    rightActionActivationDistance={300}
                    onRightActionActivate={() => true}
                    onSwipeStart={() => this.setState({scroll:false})}
                    onSwipeEnd={() => this.setState({scroll:true})}>
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
            </Swipeable>
        )
    }


    render() {

        return (
            <Container>
                <Content scrollEnabled={this.state.scroll}>
                    <FlatList scrollEnabled={this.state.scroll}
                        keyExtractor={(item) => `${item.id}`}
                        data={this.state.eventos_lista}
                        renderItem={({item}) => this._renderItem(item)}/>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    rightArrow: {
        color:'lightgrey'
    },
    rightButton1:{
        flexDirection:'row',
        height:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingLeft: 30,
        backgroundColor:'red',
    },
})