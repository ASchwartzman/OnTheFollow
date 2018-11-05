import React, { Component } from 'react'
import { FlatList, StyleSheet, Alert } from 'react-native'
import WalletHeader from '../components/WalletHeader'
import { Container,
    Content,
    Toast,
    ActionSheet,
} from 'native-base'
import BoletaItem from '../components/BoletaItem'
import moment from 'moment'
import 'moment/locale/pt-br'
import WalletFooter from '../components/WalletFooter'

const boletas = [
    {id: 1, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Fill', lote: 100, tradePrice: 19, tradeDate: new Date('2015-09-17')},
    {id: 2, checked:false, ativo:'Brasil', operation: 'V', contraparte: 'Marcus', lote: 100, tradePrice: 25, tradeDate: new Date('2013-06-02')},
    {id: 3, checked:false, ativo:'França', operation: 'V', contraparte: 'Naman', lote: 50, tradePrice: 13, tradeDate: new Date()},
    {id: 4, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Fill', lote: 100, tradePrice: 19, tradeDate: new Date('2015-09-17')},
    {id: 5, checked:false, ativo:'Brasil', operation: 'V', contraparte: 'Marcus', lote: 100, tradePrice: 25, tradeDate: new Date('2013-06-02')},
    {id: 6, checked:false, ativo:'França', operation: 'V', contraparte: 'Naman', lote: 50, tradePrice: 13, tradeDate: new Date()},
    {id: 7, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Fill', lote: 100, tradePrice: 19, tradeDate: new Date('2015-09-17')},
    {id: 8, checked:false, ativo:'Brasil', operation: 'V', contraparte: 'Marcus', lote: 100, tradePrice: 25, tradeDate: new Date('2013-06-02')},
    {id: 9, checked:false, ativo:'França', operation: 'V', contraparte: 'Naman', lote: 50, tradePrice: 13, tradeDate: new Date()},
    {id: 10, checked:true, ativo:'Alemanha', operation: 'C', contraparte: 'Fill', lote: 100, tradePrice: 19, tradeDate: new Date('2015-09-17')},
    {id: 11, checked:false, ativo:'Brasil', operation: 'V', contraparte: 'Marcus', lote: 100, tradePrice: 25, tradeDate: new Date('2013-06-02')},
    {id: 12, checked:false, ativo:'França', operation: 'V', contraparte: 'Naman', lote: 50, tradePrice: 13, tradeDate: new Date()},
]

const eventos = [
    {id:1, titulo:'Copa 2018', ativos: ['Brasil','Argentina','França','Alemanha'], vencimento: new Date('2015-09-17'), boletas: boletas, comments:'Sem Comentários' }
]

export default class Wallet extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props)
        this.state = {
            eventos: eventos,
            eventoAtivo: eventos[0].id,
            resultadosPossiveis: ['Brasil','Argentina','França','Alemanha'],
            bookTitle:'Copa 2018',
            settleDate: new Date('2018-12-15'),
            boletas: boletas,
            boletasVisiveis: [],
            showAddBoleta: false,
            filtroChecked: false,
            scroll: true,
        }
    }
    
    newBoletaAdd = (newBoleta) => {
        
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
            
            this.setState({boletas}, this.filterBoletas)
            Toast.show({
                text:'Boleta Atualizada',
                buttonText:'OK',
                duration: 3000,
                position: 'bottom',
                type:'success'
            })

        } else {
            boletas.push(newBoleta)
            this.setState({boletas}, this.filterBoletas )
            Toast.show({
                text:'Boleta Salva',
                buttonText:'OK',
                duration: 3000,
                position: 'bottom',
                type:'success'
            })
        }
    }

    newEventoAdd = (newEvento) => {
        
        const eventos_id = []
        const eventos = [...this.state.eventos]

        eventos.forEach((evento) => {
            eventos_id.push(evento.id)
        })

        if(eventos_id.includes(newEvento.id)){
            eventos.forEach((evento, index)=>{
                if (evento.id === newEvento.id) {
                    eventos[index] = newEvento
                }
            })
            
            this.setState({eventos}, this.filterBoletas)
            Toast.show({
                text:'Evento Atualizado',
                buttonText:'OK',
                duration: 3000,
                position: 'bottom',
                type:'success'
            })

        } else {
            eventos.push(newEvento)
            this.setState({eventos}, this.filterBoletas )
            Toast.show({
                text:'Evento Salvo',
                buttonText:'OK',
                duration: 3000,
                position: 'bottom',
                type:'success'
            })
        }
    }

    filterBoletas = () => {
        
        let oldBoletas = [ ...this.state.boletas ]
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

    onCheckboxPress = id => {
        const boletas = [ ...this.state.boletas]
        boletas.forEach(boleta => {
            if (boleta.id == id) {
                boleta.checked = !boleta.checked
            }
        })

        this.setState({boletas}, this.filterBoletas)
    }

    renderItem = ({item}) => {
        
        return (
            <BoletaItem 
                        onSwipeStart={()=> this.setState({ scroll: false })}
                        onSwipeRelease={() => this.setState({ scroll: true })}
                        onRightButtonPress={() => this.removeBoleta(item.id)}
                        onPressBody={() => this.onItemPress(item.id)}
                        onPressCheckbox={() => this.onCheckboxPress(item.id)}
                        checked ={item.checked} 
                        ativo={item.ativo}
                        operation = {item.operation}
                        contraparte={item.contraparte}
                        lote={item.lote}
                        tradePrice={item.tradePrice}
                        tradeDate={moment(item.tradeDate,'DD/MM/YYYY').locale('pt-br').format('D [de] MMM [,] YYYY')}/>
        )
    }

    _openActionSheet = () => {
        ActionSheet.show({
            options:['Novo Evento','Nova Boleta','Cancelar'],
            cancelButtonIndex: 2,  
        },
        buttonIndex => {
            switch(buttonIndex){
                case 0:
                    this._openNovoEvento()
                    break
                case 1:
                    this._openNovaBoleta()
                    break
                default:
                    
            }
        })
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

    _openNovoEvento = () => {
        
        this.props.navigation.navigate('EventoScreen',{
            evento_selecionado: { 
                id: Math.random(),
                titulo: '',
                ativos: [],
                vencimento: new Date(),
                comments: '',
                boletas:[],
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
        const newEvento = this.props.navigation.getParam('newEvento')
        if (newBoleta) {
            this.props.navigation.setParams({newBoleta:null})
            this.newBoletaAdd(newBoleta)   
        }

        if (newEvento) {
            this.props.navigation.setParams({newEvento:null})
            this.newEventoAdd(newEvento)  
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
                    onPressEye={() => this.toggleEye()}
                    onPressEdit={() => this._openNovoEvento()}/>
                <Content scrollEnabled={this.state.scroll}>
                    <FlatList style={styles.listContainer}
                        scrollEnabled={this.state.scroll}
                        keyExtractor={item => `${item.id}`}
                        extraData={this.state}
                        data={this.state.boletasVisiveis}
                        renderItem={({item}) => this.renderItem({item})}
                    />
                </Content>
                <WalletFooter onPressTab2={() => this._openActionSheet()}/>
            </Container>
        )                
     }
}

const styles = StyleSheet.create({
    listContainer:{

    }
})