import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Root} from 'native-base'
import Wallet from './src/screens/Wallet'
import AddBoleta from './src/screens/AddBoleta';
import AddEvento from './src/screens/AddEvento'
import { createStackNavigator , StackNavigator} from 'react-navigation'

// export default class App extends Component {
//   render() {
//     return (
          
//         <Wallet />
//         // <AddBoleta />
      
//     )
//   }
// }

const AppNavigator = StackNavigator({
  WalletScreen: {
    screen: Wallet
  },
  BoletaScreen: {
    screen: AddBoleta
  },
  EventoScreen:{
    screen: AddEvento
  }
})
export default () => 
  <Root>
    <AppNavigator />
  </Root>
