import React, { Component } from 'react-native';
import { Container, Content, Picker, Icon } from 'native-base';

const Item = Picker.Item;
​
export default class PickerAtivo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: undefined,
            selected1: 'key',
            results: {
                items: []
            }
        }
    }
    
    onValueChange (value) {
        this.setState({
            selected1 : value
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Picker
                        headerComponent={
                            <Header>
                                <Button transparent>
                                    Custom Back
                                </Button>
                                <Title>Custom Header</Title>
                            </Header>
                        }
                        mode='dropdown'
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this)}
                        placeholder='Selecione o ativo'
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        mode='dropdown'
                        style={{ }}
                        placeholderStyle={{color:'#E65100'}}
                        selectedValue={this.state.ativo}
                        onValueChange={this.onAtivoChange.bind(this)}>

                        <Item label='Cats' value='key0' />
                        <Item label='Dogs' value='key1' />
                        <Item label='Birds' value='key2' />
                        <Item label='Elephants' value='key3' />
                   </Picker>
                </Content>
            </Container>
        );
    }
}