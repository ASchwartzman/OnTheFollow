import React, { Component } from 'react'
import {StyleSheet, View} from 'react-native'
import {Form, Picker, Text, Textarea, Input, Item, Label, Icon, DatePicker, Container, Body} from 'native-base'
import moment from 'moment'
import 'moment/locale/pt-br'
import AddBoletaHeader from '../components/AddBoletaHeader'

export default class AddBoleta extends Component {
    static navigationOptions = {
        header: null,
    }
    

    constructor(props) {
        super(props)
        this.state = {
          resultadosPossiveis:['Brasil','Argentina','França'],  
          ativo: null,
          operation:null,
          lote: null,
          tradePrice: null,
          contraparte:null,
          tradeDate:new Date(),
          settleDate: null,
          comments: '',
        }
      }

    onAtivoChange = (value) => {
        this.setState({ ativo: value })
    }

    onOperationChange = (value) => {
        this.setState({ operation: value })
    }

    onLoteChange = (value) => {
        this.setState({ lote: value })
    }

    onContraparteChange = (value) => {
        this.setState({ contraparte: value })
    }

    onPriceChange = (value) => {
        this.setState({ tradePrice: value })
    }

    onTradeDateChange = (value) => {
        this.setState({ tradeDate: value })
    }

    onSettleDateChange = (value) => {
        this.setState({ settleDate: value })
    }

    onSettleDateChange = (value) => {
        this.setState({ settleDate: value })
    }

    onCommentChange = (value) => {
        this.setState({ comments: value })
    }

    cancelarBoleta = () => {
        this.props.navigation.navigate('WalletScreen')
    }

    
    render() {
        let resultadosPossiveis = this.state.resultadosPossiveis.map( (res,i) => {
            return <Picker.Item key={i} value={res} label={res} />
        })

        return (
            <Container>      
                <AddBoletaHeader onSave={()=>alert('salvo')} onCancel={()=> this.cancelarBoleta()}/>                                 
                <Form>
                    <Item inlineLabel style={styles.item}>
                        <Label style={styles.label}>Data</Label>
                        <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date(2000, 1, 1)}
                            maximumDate={new Date(2100, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={true}
                            animationType={'slide'}
                            androidMode={"default"}
                            placeHolderText="Selecione a data"
                            textStyle={{ color: "grey" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={this.onTradeDateChange.bind(this)}
                        />
                    </Item>
                    
                    <Item inlineLabel style={styles.item}>
                        <Label style={styles.label}>Ativo</Label>
                        <Picker 
                            placeholder='Selecione o ativo'
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            mode='dropdown'
                            style={{ }}
                            placeholderStyle={{color:'#E65100'}}
                            selectedValue={this.state.ativo}
                            onValueChange={this.onAtivoChange.bind(this)}>

                            {resultadosPossiveis}

                        </Picker>
                    </Item>

                    <Item inlineLabel style={styles.item}>
                        <Label style={styles.label}>Operação</Label>
                        <Picker 
                            placeholder='Compra | Venda'
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            mode='dropdown'
                            style={{  }}
                            placeholderStyle={{color:'#E65100'}}
                            selectedValue={this.state.operation}
                            onValueChange={this.onOperationChange.bind(this)}>

                            <Picker.Item key={1} value={'C'} label={'Compra'} />
                            <Picker.Item key={2} value={'V'} label={'Venda'} />

                        </Picker>
                    </Item>

                    <Item inlineLabel style={styles.item}>
                        <Label style={styles.label}>Lote</Label>
                        <Input style={styles.input} 
                                placeholder='  ...   '
                                placeholderTextColor={'#E65100'}
                                keyboardType='numeric'
                                onChangeText={this.onLoteChange.bind(this)}
                                />
                    </Item>

                    <Item inlineLabel style={styles.item}>
                        <Label style={styles.label}>Preço</Label>
                        <Input style={styles.input} 
                                placeholder='  $   '
                                placeholderTextColor={'#E65100'}
                                keyboardType='numeric'
                                onChangeText={this.onPriceChange.bind(this)}
                                />
                    </Item>

                    <Item inlineLabel style={styles.item}>
                        <Label style={styles.label}>Contraparte</Label>
                        <Input style={styles.input} 
                                placeholder='Nome do trouxa'
                                placeholderTextColor={'#E65100'}
                                keyboardType='default'
                                onChangeText={this.onContraparteChange.bind(this)}
                                />
                    </Item>

                    <Item inlineLabel style={styles.item}>
                        <Label style={styles.label}>Vencimento</Label>
                        <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date(2000, 1, 1)}
                            maximumDate={new Date(2100, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={true}
                            animationType={'slide'}
                            androidMode={"default"}
                            placeHolderText="Selecione o vencimento"
                            textStyle={{ color: "grey" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={this.onSettleDateChange.bind(this)}
                        />
                    </Item>
                    
                    <Item stackedLabel>
                        <Label>Comentários</Label>
                        <Textarea style={styles.textArea}
                            placeholder='' 
                            rowSpan={5}
                            onChangeText={this.onCommentChange.bind(this)}/>
                    </Item>

                    
            

                    {/* <Text>Ativo: {this.state.ativo}</Text>
                    <Text>Operation: {this.state.operation}</Text>
                    <Text>Lote: {this.state.lote}</Text>
                    <Text>Price: {this.state.tradePrice}</Text>
                    <Text>Contraparte: {this.state.contraparte}</Text>
                    <Text>Trade Date: {moment(this.state.tradeDate).locale('pt-br').format('D [de] MMM [,] YYYY')}</Text>
                    <Text>Settle Date: {moment(this.state.settleDate).locale('pt-br').format('D [de] MMM [,] YYYY')}</Text>
                    <Text>Comentarios: {this.state.comments}</Text> */}
                </Form>

            </Container>

        )
    }
}

const styles = StyleSheet.create({
    item:{
        justifyContent:'space-between',
        textAlign:'center'
    },
    input:{
        textAlign:'center',
        backgroundColor:null,
        textAlign:'right',
        paddingRight:20
    },
    label:{
        flexDirection:'row',
        backgroundColor:null,
        fontWeight:'bold'
    },
    textArea:{
        textAlign:'left',
        width:'100%',
        paddingTop: 15,
    }
})