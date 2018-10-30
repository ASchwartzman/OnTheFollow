import React, { Component } from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Title, Form, Picker, Button, Textarea, Input, Item, Label, Icon, DatePicker, Container, Header, TabHeading} from 'native-base'
import moment from 'moment'
import 'moment/locale/pt-br'
import AddBoletaHeader from '../components/AddBoletaHeader'
import BoletaItem from '../components/BoletaItem';
// import PickerAtivo from '../components/PickerAtivo'

export default class AddBoleta extends Component {
    static navigationOptions = {
        header: null,
    }
    

    constructor(props) {
        super(props)
        this.state = {
          resultadosPossiveis:this.props.navigation.getParam('resultadosPossiveis'),
        }
      }
    onPressSave = () => {
        if(this.state.ativo == null || this.state.operation === null || 
            this.state.lote === null || this.state.tradePrice === null ||
            this.state.contraparte === null) {
            
            Alert.alert('Campos Incompletos','Preencha os campos em laranja')
            return
        }

        let newBoleta ={
            id: this.state.id,
            checked: false,
            ativo: this.state.ativo,
            operation: this.state.operation,
            lote: this.state.lote,
            tradePrice: this.state.tradePrice,
            contraparte: this.state.contraparte,
            tradeDate: this.state.tradeDate,
            settleDate: this.state.settleDate,
            comments: this.state.comments
        }
        const flagNewBoleta = true
        this.props.navigation.navigate('WalletScreen', {flagNewBoleta, newBoleta})
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
    componentDidMount(){
        const boleta = this.props.navigation.getParam('boleta_selecionada') 
        this.setState({
            id: boleta.id,
            ativo: boleta.ativo,
            operation: boleta.operation,
            lote: boleta.lote,
            tradePrice: boleta.tradePrice,
            contraparte: boleta.contraparte,
            tradeDate: boleta.tradeDate,
            settleDate: boleta.settleDate,
            comments: boleta.comments,
        })
    }
    
    render() {
        let resultadosPossiveis = this.state.resultadosPossiveis.map( (res,i) => {
            return <Picker.Item key={i} value={res} label={res} />
        })

        return (
            <Container>      
                <AddBoletaHeader onSave={()=>this.onPressSave()} onCancel={()=> this.cancelarBoleta()}/>                                 
                <KeyboardAwareScrollView>
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
                                placeHolderText={moment(this.state.tradeDate).locale('pt-br').format('DD/MM/YYYY')}
                                value={this.state.tradeDate}
                                textStyle={{ color: "grey" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.onTradeDateChange.bind(this)}
                            />
                        </Item>
                        
                        <Item inlineLabel style={styles.item}>
                            <Label style={styles.label}>Ativo</Label>
                            <Picker
                                iosHeader='Ativos'
                                headerBackButtonText='Voltar'
                                placeholder='Selecione o ativo'
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                mode='dropdown'
                                style={{ flexDirection:'column' }}
                                placeholderStyle={{color:'#E65100'}}
                                selectedValue={this.state.ativo}
                                onValueChange={this.onAtivoChange.bind(this)}>

                                {resultadosPossiveis}

                            </Picker>
                            {/* <PickerAtivo resultadosPossiveis={resultadosPossiveis} /> */}
                        </Item>

                        <Item inlineLabel style={styles.item}>
                            <Label style={styles.label}>Operação</Label>
                            <Picker 
                                iosHeader='Operação'
                                headerBackButtonText='Voltar'
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
                                    value={this.state.lote ? `${this.state.lote}` : null}
                                    placeholderTextColor={'#E65100'}
                                    keyboardType='numeric'
                                    onChangeText={this.onLoteChange.bind(this)}
                                    />
                        </Item>

                        <Item inlineLabel style={styles.item}>
                            <Label style={styles.label}>Preço</Label>
                            <Input style={styles.input} 
                                    placeholder='  $   '
                                    value={this.state.tradePrice ? `${this.state.tradePrice}` : null}
                                    placeholderTextColor={'#E65100'}
                                    keyboardType='numeric'
                                    onChangeText={this.onPriceChange.bind(this)}
                                    />
                        </Item>

                        <Item inlineLabel style={styles.item}>
                            <Label style={styles.label}>Contraparte</Label>
                            <Input style={styles.input} 
                                    placeholder='Nome do trouxa'
                                    value={this.state.contraparte ? `${this.state.contraparte}` : null}
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
                                placeHolderText={moment(this.state.settleDate).locale('pt-br').format('DD/MM/YYYY')}
                                value={this.state.settleDate}
                                textStyle={{ color: "grey" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.onSettleDateChange.bind(this)}
                            />
                        </Item>
                        
                        <Item stackedLabel>
                            <Label>Comentários</Label>
                            <Textarea style={styles.textArea}
                                placeholder='' 
                                selectionColor='rgb(76,217,100)'
                                value={this.state.comments ? `${this.state.comments}` : null}
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
                </KeyboardAwareScrollView>

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
        color:'rgb(76,217,100)'
    }
})