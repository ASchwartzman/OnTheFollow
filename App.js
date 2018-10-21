import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Wallet from './src/screens/Wallet'
import AddBoleta from './src/screens/AddBoleta';
import { createStackNavigator } from 'react-navigation'

// export default class App extends Component {
//   render() {
//     return (
          
//         <Wallet />
//         // <AddBoleta />
      
//     )
//   }
// }

export default createStackNavigator({
  WalletScreen: {
    screen: Wallet
  },
  BoletaScreen: {
    screen: AddBoleta
  }
})
