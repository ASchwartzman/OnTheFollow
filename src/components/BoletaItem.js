import React, { Component } from 'react'
import {StyleSheet, View, TouchableOpacity, TouchableHighlight} from 'react-native'
import Swipeable from 'react-native-swipeable'
import { ListItem, Body, Text, CheckBox, Badge, Icon} from 'native-base'




export default class BoletaItem extends Component {
    // state={
    //     badgeColor: null
    // }

    // setBadgeColor = () => {
    //     let badgeColor = (this.props.operation === 'C') ? {backgroundColor:'#5cb85c'} : {backgroundColor:'#d9534f'}
    //     this.setState({ badgeColor }) 
    // }

    // componentWillMount() {
    //     this.setBadgeColor()
    // }

    renderRightButtons = () => {
        return [
            <TouchableHighlight onPress={this.props.onRightButtonPress}>
                <View style={styles.rightButton1}>
                    <Icon style={{fontSize: 30, color:'white'}} name='trash'/>
                </View>
            </TouchableHighlight>
            ]
    }
    
    render() {
        let badgeColor = (this.props.operation === 'C') ? {backgroundColor:'#5cb85c'} : {backgroundColor:'#d9534f'}
        let backgroundColorChecked = this.props.checked ? 'rgba(0,0,255,0.03)':'rgba(0,0,255,0)'
        return (
            <Swipeable rightButtons={this.renderRightButtons()}
                        rightActionActivationDistance={300}
                        onRightActionActivate={this.props.onRightButtonPress}
                        onSwipeStart={this.props.onSwipeStart}
                        onSwipeRelease={this.props.onSwipeRelease}>
                <ListItem style={[styles.listItem,{backgroundColor: backgroundColorChecked}]}>
                    <View style={styles.left}>
                        <CheckBox onPress={this.props.onPressCheckbox} checked={this.props.checked}
                                color='royalblue' style={{height:25, width: 25, alignItems:'center', justifyContent:'center', borderRadius: 25, padding:3}} />
                    </View>
                    <TouchableOpacity activeOpacity={0.3} onPress={this.props.onPressBody} style={[styles.touchable, {backgroundColor: 'rgba(0,0,0,0)'}]}>   
                        <Body style={[styles.body]}>
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
                            <Badge big style={[badgeColor]}>
                                <Text>{this.props.operation}</Text>
                            </Badge>
                                <Icon type='FontAwesome' name='angle-right' style={styles.rightArrow}/>
                        </View>
                    </TouchableOpacity>               
                </ListItem>
            </Swipeable>
        )
    }
}

const styles = StyleSheet.create({
    listItem:{
        borderBottomWidth: 0.2,
        marginLeft: 0,
    },
    touchable:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    left:{
        backgroundColor:'white',
        width: 15,
        marginRight: 15,
        marginLeft: 15,
        alignItems:'center',
    },
    right:{  
        flexDirection:'row',
        width:60,
        marginRight: 30,
        justifyContent:'space-around',
        alignItems:'center',
    },
    ativo:{
        fontWeight:'bold',
        color:'orange'
    },
    body:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal:5,
        borderLeftColor:'lightgrey',
        borderRightColor:'white',
    },
    rightArrow:{
        color:'lightgrey',    
    },
    rightButton1:{
        flexDirection:'row',
        height:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingLeft: 30,
        backgroundColor:'red',
    }

})