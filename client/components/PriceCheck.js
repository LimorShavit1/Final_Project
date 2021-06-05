import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useApi } from '../hooks/api.hook';
import * as houseAction from '../redux/actions/houseAction';

const PriceCheck = (props) => {
    console.log(props.item.cart_price);
    const api = useApi();
    const _getListDetailes = async () => {
        try {
            const result = await api.getList(listid);
            await api.addtoHistory(result, props.item.cart_price);

        } catch (e) {
            console.log(e);
        }
        dispatch(houseAction.deleteList(listid))
        .then(() => {
            Alert.alert('You finish with this list');
        })
        .catch(() => {

            Alert.alert('An error occurred. Try Again', [{ text: 'OK' }])
        })
        props.navigation.navigate('Home');

    }

    
    // let missing = [];

    // for (let i = 0; i < props.item.missing.length; i++) {

    //     missing.push(
    //         <Text>
    //            {props.item.missing[i]}
            
    //          </Text>
    //     )
    // }
    return (
        <TouchableOpacity onPress={_getListDetailes}>
            <View style={styles.card}>
                <Image
                    source={{ uri: 'https://sloanreview.mit.edu/wp-content/uploads/2017/09/MAG-Simchi-Price-Optimization-Marketing-Analytics-Performance-Promotion-Pricing-1200-1200x630.jpg' }}
                    style={styles.coverImage}

                />

                <View style={styles.description}>
                    <Text style={styles.title}>{props.item.supermarket.sub_chain_name}</Text>
                    <Text style={styles.descriptionText}>
                        מרחק מהבית:{props.item.supermarket.distance}
                    </Text>
                    <Text style={styles.descriptionText}>
                         כתובת :{props.item.supermarket.store_area}
                    </Text>
                 
                    <Text style={styles.descriptionText}>
                        סה"כ:{'\u20AA'}{props.item.cart_price}
                    </Text>
                    
                </View>
                {/* <View>
                    <Text>
                        מוצרים חסרים:
                    </Text>
                    {missing}
                </View> */}
                {/* <MaterialCommunityIcons style={styles.icon} size={40} name={'recycle'}
                    onPress={() => {
                       // {toggleModalVisibility}
                       { toDo(props.userID, props.item.ListName, props.item.items) }
                    }} /> */}

            </View>


        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        elevation: 5,
        height: 250,
        margin: 10
      },

    listItem: {
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 40,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    coverImage: {
        width: 80,
        height: 80,
        borderRadius: 8
    },

    title: {
        fontSize: 18,
        width: 200,

    },
    icon: {

        color: "#72bcd4",
        width: 50,


    },

    description: {
        margin: 10
    },
    descriptionText: {
        fontSize: 16,
        color: 'gray'
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
});
export default PriceCheck;