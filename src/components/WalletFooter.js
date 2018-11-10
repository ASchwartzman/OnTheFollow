import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Footer, FooterTab, Icon, Text, Button} from 'native-base'

export default class WalletFooter extends Component {
    constructor(props){
        super(props)
        this.state = {
            ActiveTab_0:true,
            ActiveTab_1:false,
            ActiveTab_2:false
        }
    }

    activeTab = (tab) => {
        switch(tab) {
            case 0:
                this.setState({ActiveTab_0:true, ActiveTab_1: false, ActiveTab_2:false})
                return this.props.onPressTab0()
                break
            case 1:
                this.setState({ActiveTab_0:false, ActiveTab_1:true, ActiveTab_2:false})
                return this.props.onPressTab1()
                break
            case 2:
                this.setState({ActiveTab_0:true, ActiveTab_1:false, ActiveTab_2:false})
                return this.props.onPressTab2()
                break
        }
    }

    render(){
        return (
            <Footer>
                <FooterTab >
                    <Button vertical active={this.state.ActiveTab_0} onPress={() => this.activeTab(0)}>
                        <Icon type='Feather' name='list' style={{fontSize:27}}/>
                        <Text>Boletas</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button vertical active={this.state.ActiveTab_1} onPress={() => this.activeTab(1)}>
                        <Icon type='FontAwesome' name='exchange'/>
                        <Text>Pagamentos</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button vertical active={this.state.ActiveTab_2} onPress={() => this.activeTab(2)}>
                        <Icon name='add' style={{fontSize:32}}/>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

const styles = StyleSheet.create({

})