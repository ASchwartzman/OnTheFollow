import React, { Component } from 'react'
import { FlatList, StyleSheet, Alert } from 'react-native'
import WalletHeader from '../components/WalletHeader'
import { Container,
    Content,
} from 'native-base'
import BoletaItem from '../components/BoletaItem'
import moment from 'moment'
import 'moment/locale/pt-br'
import WalletFooter from '../components/WalletFooter'

const boletas = [
    {id: 1, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Fill', lote: 100, tradePrice: 19, tradeDate: new Date('2015-09-17')},
    {id: 2, checked:false, ativo:'Brasil', operation: 'V', contraparte: 'Marcus', lote: 100, tradePrice: 25, tradeDate: new Date('2013-06-02')},
    {id: 3, checked:false, ativo:'França', operation: 'V', contraparte: 'Naman', lote: 50, tradePrice: 13, tradeDate: new Date()},
]

export default class Wallet extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props)
        this.state = {
            resultadosPossiveis: ['Brasil','Argentina','França','Alemanha'],
            bookTitle:'Copa 2018',
            settleDate: new Date('2018-12-15'),
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

        boletas.forEach((boleta) => {
            boletas_id.push(boleta.id)
        })

        if(boletas_id.includes(newBoleta.id)){
            boletas.forEach((boleta, index)=>{
                if (boleta.id === newBoleta.id) {
                    boletas[index] = newBoleta
                }
            })
            
            console.log('Antes',this.state.boletas)
            
            this.setState({boletas}, () => {
                this.filterBoletas()
                console.log('Depois',this.state.boletas)
                Alert.alert('Boleta Atualizada')
            })
        } else {
            boletas.push(newBoleta)
            this.setState({boletas}, this.filterBoletas )
            Alert.alert('Boleta Salva')
        }

        
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

    onItemPress = id => {
        const boletas = [ ...this.state.boletas]
        const resultadosPossiveis = [ ...this.state.resultadosPossiveis]
        let boleta_selecionada = null
        boletas.forEach((boleta, index) => {
            if(boleta.id === id){
                boleta_selecionada = boletas[index]
            }
        })
        
        this.props.navigation.navigate('BoletaScreen',{
            resultadosPossiveis,
            boleta_selecionada
        })
    }

    renderItem = ({item}) => {
        
        return (
            <BoletaItem onRightButtonPress={() => this.removeBoleta(item.id)}
                        onPressBody={() => this.onItemPress(item.id)}
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
        const resultadosPossiveis = [ ...this.state.resultadosPossiveis]
        
        this.props.navigation.navigate('BoletaScreen',{
            resultadosPossiveis,
            boleta_selecionada: { 
                id: Math.random(), 
                ativo: null,
                operation:null,
                lote: null,
                tradePrice: null,
                contraparte:null,
                tradeDate:new Date(),
                settleDate: this.state.settleDate,
                comments: '',
              }
        })
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
            this.props.navigation.setParams({newBoleta:null})
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