import React, { Component } from 'react'
import {StyleSheet, FlatList} from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import {
    Form,
    Label,
    ListItem,
    Item,
    Text,
} from 'native-base'


export default class Pagamentos extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            radio_props: [],
            resultadoFinal: 'Indefinido',
            boletas:[],
            contrapartes:[]
        }
    }

    _setRadioProps = () => {
        let ativos = ['Indefinido', ...this.props.ativos]
        let radio_props = []

        ativos.forEach((ativo, index) => {
            radio_props[index] = {label: ativo, value: ativo}
        })

        this.setState({radio_props})
    }
    
    _setBoletas = () => {
        boletas = [...this.props.boletas]
        contrapartes = []

        boletas.forEach(boleta => {
            if (!contrapartes.includes(boleta.contraparte)){
                contrapartes.push(boleta.contraparte)
            }
        })

        this.setState({ boletas, contrapartes })
    }

    acertoFinal = nome => {
        let resultadoFinal = this.state.resultadoFinal
        let resultado_nome = 0
        let boletas_nome = []

        if (nome == 'Total') {
            boletas_nome = this.state.boletas
        } else {
            boletas_nome = this.state.boletas.filter(boleta => boleta.contraparte == nome)
        }

        boletas_nome.map(boleta => {
            let lote = boleta.operation == 'C' ? boleta.lote : -boleta.lote
            let tradePrice = boleta.tradePrice

            if (resultadoFinal == 'Indefinido') {
                resultado_nome = '--'
            } else if (boleta.ativo == resultadoFinal) {
                resultado_nome += (100 - tradePrice) * lote
            } else {
                resultado_nome += (0 - tradePrice) * lote
            }
        })

        let resultadoColor = resultado_nome < 0 ? 'red' : 'blue'
        if (typeof(resultado_nome) != 'string') {
            resultado_nome = (resultado_nome).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }

        let resultadoContraparteColor = nome == 'Total' ? "#cde1f9" : 'rgba(0,0,0,0)'
        return (
            <ListItem noIndent style={[styles.resultadoNome,{backgroundColor: resultadoContraparteColor}]}>
                <Text>{nome}</Text>
                <Text style={{color: resultadoColor}}>$ {resultado_nome}</Text>
            </ListItem>
        )
    }

    componentDidMount(){
        this._setRadioProps()
        this._setBoletas()
    }

    render() {
        return (
            <Form>
                <Item stackedLabel>
                    <Label style={{marginBottom:5}}>Resultado Final</Label>
                    <RadioForm style={styles.radioForm}
                        formHorizontal={true}
                        labelHorizontal={false}
                        radio_props={this.state.radio_props}
                        initial={0}
                        buttonSize={15}
                        selectedButtonColor={'orange'}
                        onPress={value => this.setState({resultadoFinal: value})}/>
                </Item>
                <Item stackedLabel>
                    <Label style={{marginBottom:5}}>Pagar / Receber</Label>
                    <FlatList
                        extraData={this.state} 
                        keyExtractor={item => `${item}`}
                        data={['Total', ...this.state.contrapartes]}
                        renderItem={({item}) => this.acertoFinal(item)}
                    />
                    
                    {/* {this.state.contrapartes.map(nome => this.acertoFinal(nome))} */}
                </Item>
            </Form>
        )
    }
}

const styles = StyleSheet.create({
    radioForm:{
        flexWrap:'wrap',
        marginTop: 10,
    },
    resultadoNome: {
        width:200,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'rgba(0,0,0,0)'
    }
})