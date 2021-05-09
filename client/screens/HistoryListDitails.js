import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';


const HistoryListDitails = props => {
    const { items } = props.route.params;
    console.log(items);

    var products = [];

    for (let i = 0; i < items.length; i++) {

        products.push(
            <View key={i}>
                <View style={styles.row}>
                    <Text  >{items[i].product_name}</Text>
                    <Text>          </Text>
                    <Text style={{ fontWeight: 'bold' }}>{items[i].quantity}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.imageContainer}>

            <ImageBackground source={{ uri: 'https://image.made-in-china.com/2f0j00EMOTFupnnmrL/High-Quality-Spiral-Notebook-with-Lines-Printed-YY-N0122-.jpg' }} style={styles.image}>
                <ScrollView>
                    <Text style={styles.text} ></Text>

                    {products}

                </ScrollView>


            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({

    imageContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    row: {

        flexDirection: "row"
      },
    image: {
        width: '100%',
        height: '100%',

    },
    text: {
        marginTop: 80,

    }

});
export default HistoryListDitails;