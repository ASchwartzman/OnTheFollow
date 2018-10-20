import React, { Component } from 'react'
import { View } from 'react-native'
import WalletHeader from '../components/WalletHeader'
import { Container,
    Header,
    Content,
    List, 
    ListItem,
    Left,
    Body, Right, Thumbnail, Text 
} from 'native-base'
import BoletaItem from '../components/BoletaItem'

export default class Wallet extends Component {
    
    state = {
        boletas :[
            {id: 1, asset: 'Mito', operation: 'C', lote: 100, price: 55, contraparte: 'Marcus', date: new Date()},
            {id: 2, asset: 'Haddad', operation: 'C', lote: 100, price: 30, contraparte: 'Marcus', date: new Date()},
            {id: 3, asset: 'Xuxu', operation: 'V', lote: 100, price: 16, contraparte: 'Marcus', date: new Date()},
            {id: 4, asset: 'Marinoca', operation: 'C', lote: 100, price: 11, contraparte: 'Marcus', date: new Date()},
            {id: 5, asset: 'Ciro', operation: 'V', lote: 100, price: 9, contraparte: 'Marcus', date: new Date()},
        ],
        showAddBoleta: false,
    }

    addBoleta = boleta => {
        const boletas = [ ...this.state.boletas ]
        boletas.push({
            id: Math.random(),
            date: bolea.date,
            asset: boleta.asset,
            operation: boleta.operation,
            lote: boleta.lote,
            price: boleta.price,
            contraparte: boleta.contraparte
        })
        this.setState({ boletas })
    }

    render() {
        return (
            <Container>
               <WalletHeader bookTitle={'Copa 2018'}/>
                <Content>
                    <List>
                        <BoletaItem checked ={true} 
                                    ativo={'Alemanha'}
                                    operation = {'C'}
                                    contraparte={'Fill'}
                                    lote={100}
                                    tradePrice={19}
                                    tradeDate={'02 de dez'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'Brasil'}
                                    operation = {'V'}
                                    contraparte={'Marcus'}
                                    lote={50}
                                    tradePrice={23}
                                    tradeDate={'22 de abr'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'França'}
                                    operation = {'V'}
                                    contraparte={'Naman'}
                                    lote={35}
                                    tradePrice={14}
                                    tradeDate={'15 de jan'}/>
                        <BoletaItem checked ={true} 
                                    ativo={'Alemanha'}
                                    operation = {'C'}
                                    contraparte={'Fill'}
                                    lote={100}
                                    tradePrice={19}
                                    tradeDate={'02 de dez'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'Brasil'}
                                    operation = {'V'}
                                    contraparte={'Marcus'}
                                    lote={50}
                                    tradePrice={23}
                                    tradeDate={'22 de abr'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'França'}
                                    operation = {'V'}
                                    contraparte={'Naman'}
                                    lote={35}
                                    tradePrice={14}
                                    tradeDate={'15 de jan'}/>
                        <BoletaItem checked ={true} 
                                    ativo={'Alemanha'}
                                    operation = {'C'}
                                    contraparte={'Fill'}
                                    lote={100}
                                    tradePrice={19}
                                    tradeDate={'02 de dez'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'Brasil'}
                                    operation = {'V'}
                                    contraparte={'Marcus'}
                                    lote={50}
                                    tradePrice={23}
                                    tradeDate={'22 de abr'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'França'}
                                    operation = {'V'}
                                    contraparte={'Naman'}
                                    lote={35}
                                    tradePrice={14}
                                    tradeDate={'15 de jan'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'Brasil'}
                                    operation = {'V'}
                                    contraparte={'Marcus'}
                                    lote={50}
                                    tradePrice={23}
                                    tradeDate={'22 de abr'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'França'}
                                    operation = {'V'}
                                    contraparte={'Naman'}
                                    lote={35}
                                    tradePrice={14}
                                    tradeDate={'15 de jan'}/>
                        <BoletaItem checked ={true} 
                                    ativo={'Alemanha'}
                                    operation = {'C'}
                                    contraparte={'Fill'}
                                    lote={100}
                                    tradePrice={19}
                                    tradeDate={'02 de dez'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'Brasil'}
                                    operation = {'V'}
                                    contraparte={'Marcus'}
                                    lote={50}
                                    tradePrice={23}
                                    tradeDate={'22 de abr'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'França'}
                                    operation = {'V'}
                                    contraparte={'Naman'}
                                    lote={35}
                                    tradePrice={14}
                                    tradeDate={'15 de jan'}/>
                        <BoletaItem checked ={true} 
                                    ativo={'Alemanha'}
                                    operation = {'C'}
                                    contraparte={'Fill'}
                                    lote={100}
                                    tradePrice={19}
                                    tradeDate={'02 de dez'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'Brasil'}
                                    operation = {'V'}
                                    contraparte={'Marcus'}
                                    lote={50}
                                    tradePrice={23}
                                    tradeDate={'22 de abr'}/>
                        <BoletaItem checked ={false} 
                                    ativo={'França'}
                                    operation = {'V'}
                                    contraparte={'Naman'}
                                    lote={35}
                                    tradePrice={14}
                                    tradeDate={'15 de jan'}/>
                       
                        
                    </List>
                </Content>

            </Container>
        )
    }
}