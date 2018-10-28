import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import WalletHeader from '../components/WalletHeader'
import { Container,
    Content,
} from 'native-base'
import BoletaItem from '../components/BoletaItem'
import moment from 'moment'
import 'moment/locale/pt-br'
import WalletFooter from '../components/WalletFooter'

const boletas = [
    {id: 1, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Fill', lote: 100, tradePrice: 19, tradeDate: '15/09/2018'},
    {id: 2, checked:false, ativo:'Brasil', operation: 'V', contraparte: 'Marcus', lote: 100, tradePrice: 25, tradeDate: '01/06/2013'},
    {id: 3, checked:false, ativo:'França', operation: 'V', contraparte: 'Naman', lote: 50, tradePrice: 13, tradeDate: '01'},
    // {id: 4, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Sudano', lote: 20, tradePrice: 22, tradeDate: new Date()},
    // {id: 5, checked:false, ativo:'Belgica', operation: 'V', contraparte: 'Artur Lida', lote: 30, tradePrice: 9, tradeDate: new Date()},
    // {id: 6, checked:true, ativo:'Argentina', operation: 'V', contraparte: 'Caetano Ramos', lote: 75, tradePrice: 7, tradeDate: new Date()},              
    // {id: 7, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Fill', lote: 100, tradePrice: 19, tradeDate: '15/09/2018'},
    // {id: 8, checked:false, ativo:'Brasil', operation: 'C', contraparte: 'Marcus', lote: 100, tradePrice: 25, tradeDate: '01/06/2013'},
    // {id: 9, checked:false, ativo:'França', operation: 'C', contraparte: 'Naman', lote: 50, tradePrice: 13, tradeDate: '01'},
    // {id: 10, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Sudano', lote: 20, tradePrice: 22, tradeDate: new Date()},
    // {id: 11, checked:false, ativo:'Belgica', operation: 'V', contraparte: 'Artur Lida', lote: 30, tradePrice: 9, tradeDate: new Date()},
    // {id: 12, checked:true, ativo:'Argentina', operation: 'V', contraparte: 'Caetano Ramos', lote: 75, tradePrice: 7, tradeDate: new Date()},              
]

export default class Wallet extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props)
        this.state = {
            resultadosPosiveis: ['Brasil','Argentina','França','Alemanha'],
            bookTitle:'Copa 2018',
            boletas: boletas,
            boletasVisiveis: [],
            showAddBoleta: false,
            filtroChecked: false,
        }
    }
    
    newBoletaAdd = (newBoleta) => {
        // const newBoleta = this.props.navigation.getParam('newBoleta')
        const boletas_id = []
        const boletas = [...this.state.boletas]

        console.log(`NewBoleta:${newBoleta}`)

        boletas.forEach((boleta) => {
            boletas_id.push(boleta.id)
        })
        console.log(boletas_id)
        if(boletas_id.includes(newBoleta.id)){
            return
        } else {
            boletas.push(newBoleta)
        }

        this.setState({boletas}, this.filterBoletas)
    }

    filterBoletas = () => {
        let oldBoletas = [ ...this.state.boletas ]
        let refresh = !this.state.refresh
        let boletasVisiveis = this.state.filtroChecked ? oldBoletas.filter(item => !item.checked) : oldBoletas
       
        this.setState({boletasVisiveis})
        
    }

    removeBoleta = id => {     
        let boletas = [ ...this.state.boletas ].filter(boleta => boleta.id != id)
        this.setState({ boletas }, this.filterBoletas)
    }

    renderItem = ({item}) => {
        
        return (
            <BoletaItem onRightButtonPress={() => this.removeBoleta(item.id)}
                        onPressBody={() => alert(item.ativo)}
                        checked ={item.checked} 
                        ativo={item.ativo}
                        operation = {item.operation}
                        contraparte={item.contraparte}
                        lote={item.lote}
                        tradePrice={item.tradePrice}
                        tradeDate={moment(item.tradeDate,'DD/MM/YYYY').locale('pt-br').format('D [de] MMM [,] YYYY')}/>
        )
    }

    _openNovaBoleta = () => {
        const resultadosPossiveis = [ ...this.state.resultadosPosiveis]
        this.props.navigation.navigate('BoletaScreen',{resultadosPossiveis})
    } 

    toggleEye = () => {
        let filtroChecked = !this.state.filtroChecked
        this.setState({ filtroChecked }, this.filterBoletas)
    }

    componentWillMount() {
        // this.filterBoletas()
    }

    componentDidMount() {
        this.filterBoletas()
    }

    componentDidUpdate() {
        const newBoleta = this.props.navigation.getParam('newBoleta')
        if (newBoleta) {
            this.newBoletaAdd(newBoleta)
        }
    }

    test = () => {
       
    }

    render() {
        return (
            <Container>
                <WalletHeader 
                    bookTitle={`${this.state.bookTitle} (${this.state.boletasVisiveis.length})`} 
                    checked={this.state.filtroChecked}
                    onPressEye={() => this.toggleEye()}/>
                <Content>
                    <FlatList style={styles.listContainer}
                        keyExtractor={item => `${item.id}`}
                        extraData={this.state}
                        data={this.state.boletasVisiveis}
                        renderItem={({item}) => this.renderItem({item})}
                    />
                </Content>
                <WalletFooter onPressTab2={() => this._openNovaBoleta()}/>
            </Container>
        )                
     }
}

const styles = StyleSheet.create({
    listContainer:{

    }
})