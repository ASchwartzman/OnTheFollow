import React, { Component} from 'react'
import { Drawer, Text } from 'native-base'
import Sidebar from './Sidebar'

export default class BooksDrawer extends Component{
    closeDrawer = () => {
        this.drawer._root.close()
    }
    openDrawer = () => {
        this.drawer._root.open()
    }
    render() {
        return(
            <Drawer
                ref={(ref) => { this.drawer = ref}}
                content={<Sidebar />}
                onClose={() => this.closeDrawer()}>

                {/* <WalletHeader bookTitle={this.props.bookTitle} checked={false}
                        onPressMenu={() => this.openDrawer()}/> */}
            </Drawer>
        )
    }
}