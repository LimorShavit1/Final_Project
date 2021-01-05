import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Card from '../components/Card';


const CreateListScreen = () => {
    const [product, setProduct] = useState('');

    // array of product items:
    const [productsList, setProductsList] = useState([]);

    const addProductToList = () => {
        setProductsList([...productsList, product]);
        console.log(productsList);
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="black" />
                <TextInput
                    placeholder="Search Product"
                    style={styles.textInput}
                    onChangeText={text => setProduct(text)}
                    value={product}

                />
                <Button
                    title="Search"
                    onPress={() => console.log('pressed search')}
                />

            </View>
            <Button
                title="Add"
                onPress={addProductToList}
                style={styles.btnAdd}
            />

            <View>
                {/* using map function to display all items in screen */}
                {productsList.map(item => <View><Text>{item}</Text></View>)}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    textInput: {
        padding: 10,
        borderColor: '#000000',
        marginTop: 10,
        borderWidth: 1
    },
    searchContainer: {
        flexDirection: 'row',
        marginTop: 10,
        
    },
    btnAdd: {
        marginTop:10,
        backgroundColor: '#ffffff'
    },


});

export default CreateListScreen;