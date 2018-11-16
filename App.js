import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Root} from 'native-base'
import Wallet from './src/screens/Wallet'
import AddBoleta from './src/screens/AddBoleta'
import AddEvento from './src/screens/AddEvento'
import EventosList from './src/screens/EventosList'
import { createStackNavigator , StackNavigator} from 'react-navigation'


const AppNavigator = StackNavigator({
  WalletScreen: {
    screen: Wallet
  },
  BoletaScreen: {
    screen: AddBoleta
  },
  EventoScreen:{
    screen: AddEvento
  },
  EventosListScreen: {
    screen: EventosList,
    navigationOptions: ({ navigation }) => ({
      title:`Eventos`,
    })
  },
})
export default () => 
  <Root>
    <AppNavigator />
  </Root>
