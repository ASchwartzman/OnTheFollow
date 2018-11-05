import React, { Component } from 'react'
import {StyleSheet, View, TouchableHighlight , Keyboard} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Form,
        Picker,
        Text,
        Textarea,
        Input,
        Item,
        Label,
        Icon,
        DatePicker,
        Container,
        Button,
        List,
        ListItem} 
from 'native-base'
import Modal from 'react-native-modal'
import moment from 'moment'
import 'moment/locale/pt-br'
import AddBoletaHeader from '../components/AddBoletaHeader'

export default class AddEvento extends Component {
    static navigationOptions = {
        header: null,
    }
    

    constructor(props) {
        super(props)
        this.state = {
          modalAtivoVisible: false,
          novoAtivo: null
        }
    }

    onPressSave = () => {
        // if(this.state.ativo == null || this.state.operation === null || 
        //     this.state.lote === null || this.state.tradePrice === null ||
        //     this.state.contraparte === null) {
            
        //     Alert.alert('Campos Incompletos','Preencha os campos em laranja')
        //     return
        // }

        let newEvento = {
            id: this.state.id,
            titulo: this.state.titulo,
            ativos: this.state.ativos,
            vencimento: this.state.vencimento,
            comments: this.state.comments,
            boletas: this.state.boletas,
        }

        this.props.navigation.navigate('WalletScreen', {newEvento})
    }

    onTituloChange = (value) => {
        this.setState({ titulo: value })
    }

    onSettleDateChange = (value) => {
        this.setState({ settleDate: value })
    }

    onCommentChange = (value) => {
        this.setState({ comments: value })
    }

    cancelarEvento = () => {
        this.props.navigation.navigate('WalletScreen')
    }

    _adicionarAtivo = () => {
        const ativos = [ ...this.state.ativos]
        const novoAtivo = this.state.novoAtivo
        if (ativos.includes(novoAtivo)){
            
        } else {
            ativos.push(novoAtivo)
        }
        
        this.setState({ ativos, modalAtivoVisible: false, novoAtivo: null })

    }

    _removeAtivo = item => {
        const ativos = this.state.ativos.filter(ativo => ativo !== item)

        this.setState({ ativos, modalAtivoVisible: false })
    }

    componentWillMount(){
        const evento = this.props.navigation.getParam('evento_selecionado') 
       
        this.setState({
            id: evento.id,
            titulo: evento.titulo,
            ativos: evento.ativos,
            vencimento: evento.vencimento,
            comments: evento.comments,
            boletas: evento.boletas
        })
    }
    
    render() {
        return (

            <Container>      
                <AddBoletaHeader onSave={()=>this.onPressSave()}
                                 onCancel={()=> this.cancelarEvento()}
                                 header={'Novo Evento'}/>    
                
                <Form>
                    <Item inlineLabel style={styles.item}>
                        <Label style={styles.label}>Título</Label>
                        <Input style={styles.input} 
                                placeholder='  ...   '
                                value={this.state.lote ? `${this.state.lote}` : null}
                                placeholderTextColor={'#E65100'}
                                keyboardType='default'
                                onChangeText={this.onTituloChange.bind(this)}
                                />
                        
                    </Item>

                    <Item inlineLabel style={styles.item}>
                        <Label style={styles.label}>Ativos</Label>
                        <Button onPress={() => this.setState({modalAtivoVisible: true})}
                                style={styles.ativosButton}>
                            <Icon name='add' style={{fontSize:30}}/>
                        </Button>
                        <List scrollEnabled={false}
                            dataArray={this.state.ativos}
                            renderRow={(item) => 
                                <ListItem style={{justifyContent:'space-between'}}>
                                    <Text>{item}</Text>
                                    <TouchableHighlight onPress={() => this._removeAtivo(item)}>
                                        <Icon type='Ionicons' name='md-remove-circle' style={{color:'red'}}/>
                                    </TouchableHighlight>
                                </ListItem>
                            }/>
                    </Item>
                    <Modal
                        isVisible={this.state.modalAtivoVisible}
                        transparent={true}
                        animationType='slide' >

                        <View style={{flex: 3}}/>
                        <Form style={styles.modalAtivo}>
                            <Item style={{borderBottomWidth:0}}>
                                <Input style={styles.modalInput}
                                    placeholder='Novo Ativo'
                                    onChangeText={(value) => this.setState({novoAtivo: value})}/>
                            </Item>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                                <Button 
                                    style={{alignSelf:'center', margin: 10}}
                                    onPress={() => this.setState({ modalAtivoVisible: false })}>
                                    <Text>Cancelar</Text>
                                </Button>
                                <Button 
                                    style={{alignSelf:'center', margin: 10}}
                                    onPress={() => this._adicionarAtivo()}>
                                    <Text>Adicionar</Text>
                                </Button>
                            </View>
                        </Form>
                        <View style={{flex: 3}}/>
                    </Modal>

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
    },
    ativosButton:{
        alignSelf:'center',
        width:75,
        // height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    modalAtivo:{
        flex:4,
        alignItems:'center',
        justifyContent: 'center',
    },
    modalInput:{
        backgroundColor:'white',
        alignItems:'center',
        justifyContent: 'center',
        width: '100%',
        textAlign:'center',
        borderRadius:15,
    },
})