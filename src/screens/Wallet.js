import React, { Component } from 'react'
import { View , ListView,} from 'react-native'
import WalletHeader from '../components/WalletHeader'
import { Container,
    Header,
    Content,
    List, 
    ListItem,
    Left,
    Body, Right, Thumbnail, Text ,
    Button,
    Icon,
    SwipeRow,
} from 'native-base'
import BoletaItem from '../components/BoletaItem'
import moment from 'moment'
import 'moment/locale/pt-br'
import WalletFooter from '../components/WalletFooter'

export default class Wallet extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props)
        
        this.state = {
            bookTitle:'Copa 2018',
            boletas:[
                {id: 1, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Fill', lote: 100, tradePrice: 19, tradeDate: '15/09/2018'},
                {id: 2, checked:false, ativo:'Brasil', operation: 'V', contraparte: 'Marcus', lote: 100, tradePrice: 25, tradeDate: '01/06/2013'},
                {id: 3, checked:false, ativo:'França', operation: 'V', contraparte: 'Naman', lote: 50, tradePrice: 13, tradeDate: '01'},
                {id: 4, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Sudano', lote: 20, tradePrice: 22, tradeDate: new Date()},
                {id: 5, checked:false, ativo:'Belgica', operation: 'V', contraparte: 'Artur Lida', lote: 30, tradePrice: 9, tradeDate: new Date()},
                {id: 6, checked:true, ativo:'Argentina', operation: 'V', contraparte: 'Caetano Ramos', lote: 75, tradePrice: 7, tradeDate: new Date()},              
            ],
            showAddBoleta: false,
        }
    }

    addBoleta = boleta => {
        const boletas = [ ...this.state.boletas ]
        boletas.push({
            id: Math.random(),
            checked: boleta,
            asset: boleta.asset,
            operation: boleta.operation,
            lote: boleta.lote,
            price: boleta.price,
            contraparte: boleta.contraparte
        })
        this.setState({ boletas })
    }

    removeBoleta = id => {
        let boletas = [ ...this.state.boletas ]
        boletas = boletas.filter(boleta => boleta.id != id)
        this.setState({ boletas })
    }

    _renderBoletaItem = (boleta) => {
        return(
            <SwipeRow style={{flex: 1}}
                disableRightSwipe
                rightOpenValue={-85}
                body={
                <BoletaItem checked ={boleta.checked} 
                        ativo={boleta.ativo}
                        operation = {boleta.operation}
                        contraparte={boleta.contraparte}
                        lote={boleta.lote}
                        tradePrice={boleta.tradePrice}
                        tradeDate={moment(boleta.tradeDate,'DD/MM/YYYY').locale('pt-br').format('D [de] MMM [,] YYYY')}/>
                }
                right={
                    <Button danger onPress={() => this.removeBoleta(boleta.id)}>
                      <Icon active name="trash" style={{fontSize:33}}/>
                    </Button>
                }
            />
        )
    }

    _openNovaBoleta = () => {
        this.props.navigation.navigate('BoletaScreen')
    } 

    render() {
        return (
            <Container>
                <WalletHeader bookTitle={this.state.bookTitle} checked={false}/>
                <Content>
                    <List dataArray={this.state.boletas}
                        renderRow={(boleta) => this._renderBoletaItem(boleta)}
                        />
                </Content>
                <WalletFooter onPressTab2={() => this._openNovaBoleta()}/>
            </Container>
        )                
     }
}