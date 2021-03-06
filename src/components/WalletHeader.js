import React, { Component } from 'react';
import { 
  Text,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from 'native-base';

export default class HeaderIconExample extends Component {

  state={
    checkedButton: null
  }

  componentWillReceiveProps(nextProps) {
    let checkedButton = this.props.checked ? 'eye' : 'eye-off'
    this.setState({ checkedButton })
  }

  render() {
    return (
        <Header>
          <Left style={{flex:1,flexDirection:'row', justifyContent:'flex-start', maxWidth:50}}>
            <Button transparent onPress={this.props.onPressMenu}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body style={{flex:2,flexDirection:'row',justifyContent:'flex-start'}}>
            <Title>{this.props.bookTitle}</Title>
          </Body>
          <Right style={{flex:2,flexDirection:'row', justifyContent:'flex-end', alignItems: 'center'}}>
            {/* <Button transparent onPress={this.props.onPressSearch}>
              <Icon type='EvilIcons' name='search' />
            </Button> */}
            <Button transparent onPress={this.props.onPressEye}>
              <Icon type='Feather' name={this.state.checkedButton} style={{fontSize:20}}/>
            </Button>
            <Button hasText transparent onPress={this.props.onPressEdit}>
              <Text>Editar</Text>
              {/* <Icon type='FontAwesome' name='edit' style={{fontSize:25}}/> */}
            </Button>
          </Right>
        </Header>
    )
  }
}