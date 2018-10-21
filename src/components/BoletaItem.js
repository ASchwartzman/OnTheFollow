import React, { Component } from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import { ListItem , Left, Body, Right, Text, CheckBox, Badge, Icon} from 'native-base'

export default class BoletaItem extends Component {

    badgeColor = (this.props.operation === 'C') ? {backgroundColor:'#5cb85c'} : {backgroundColor:'#d9534f'}

    render() {
        return (
            <ListItem style={{borderBottomWidth: 0}}>
                <View style={styles.left}>
                    <CheckBox onPress={this.props.onPressCheckBox} checked={this.props.checked}
                            color='rgb(150,150,150)' style={{fontSize:100}}/>
                </View>
                <TouchableOpacity onPress={this.props.onPressBody} style={styles.touchable}>   
                    <Body style={styles.body}>
                        <View>    
                            <Text style={styles.ativo}>{this.props.ativo}</Text>
                            <Text note style={{fontWeight:'bold'}}>{this.props.contraparte}</Text>
                            <Text note >{this.props.tradeDate}</Text>
                        </View>
                        
                        <View>    
                            <Text note style={{fontWeight:'bold'}}>Lote <Text note>{this.props.lote}</Text></Text>
                            <Text note style={{fontWeight:'bold'}}>Preço <Text note>${this.props.tradePrice}</Text></Text>
                        </View>
                    </Body>
                    <View style={styles.right}>
                        <Badge big style={[this.badgeColor]}>
                            <Text>{this.props.operation}</Text>
                        </Badge>
                            <Icon type='FontAwesome' name='angle-right' style={styles.rightArrow}/>
                    </View>
                </TouchableOpacity>               
            </ListItem>
        )
    }
}

const styles = StyleSheet.create({
    touchable:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    left: {
        backgroundColor:'white',
        width: 15,
        marginRight: 15,
        alignItems:'center'
    },
    right:{  
        flexDirection:'row',
        width:60,
        marginRight: 35,
        justifyContent:'space-around',
        alignItems:'center',
    },
    ativo:{
        fontWeight:'bold',
        color:'orange'
    },
    body:{
        backgroundColor:'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal:5,
        borderLeftColor:'lightgrey',
        borderRightColor:'white',
    },
    rightArrow:{
        color:'lightgrey',    
    }

})