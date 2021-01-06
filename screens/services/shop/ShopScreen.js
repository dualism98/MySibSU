import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import ProductBlock from '../../../modules/ProductBlock'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import i18n from '../../../locale/locale'


const tmp = [{name: 'Товар', image: 'https://cdn.shopify.com/s/files/1/0051/4802/products/Invertocat_2.0_Hoodie_Mock_GithubShop-1_1024x1024.jpg?v=1563301044', description: 'Описание товара, описание товара. Описание товара, описание товара. Описание товара, описание товара.', price: '1000.40'},
{name: 'Товар c длинным названием', image: 'https://5.imimg.com/data5/TS/NG/FG/ANDROID-40591384/product-jpeg-500x500.jpg', description: 'Описание товара, описание товара. Описание товара, описание товара. Описание товара, описание товара.', price: '123.4'},
{name: 'Товар с очень длинным названием', image: 'https://us.sandro-paris.com/dw/image/v2/BCMW_PRD/on/demandware.static/-/Sites-sandro-catalog-master-H13/default/dw8ce19373/images/h13/Sandro_SHPSW00154-20_V_P.jpg?sw=578&cx=221&cy=0&cw=1547&ch=2000', description: 'Описание товара, описание товара. Описание товара, описание товара. Описание товара, описание товара.', price: '21.3'}]

export default class ShopScreen extends PureComponent {
    render(){
        return(
            <View style={styles.container}>
                <Header title={i18n.t('online_catalog')} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView>
                    <View style={styles.product_view}>
                        {tmp.map(item => {
                            return(<ProductBlock name={item.name} image={item.image} price={item.price} onPress={() => this.props.navigation.navigate('Product', {item: item})} />)
                        })}
                    </View>
                </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: h,
        width: w,
        paddingBottom: 40
    },

    text: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3'
    },

    product_view: {
        paddingBottom: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})
