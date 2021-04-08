import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'; // for validation
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements'
import { Feather } from '@expo/vector-icons';

import * as listAction from '../redux/actions/listAction';



//schema for input validation 
const formSchema = yup.object({
    productName: yup.string().required().min(2)
});

const SearchProductScreen = props => {
    let textInput = '';
    const { listId } = props.route.params;
    console.log("listID in SearchProductScreen:", listId);

    const dispatch = useDispatch();
    var products_list = [];
    const [FetchingProductsSucced, setFetchingProductsSucced] = useState(false);

    useEffect(() => {
        console.log(products_list);
        PushDataToList(products_list);
        //console.log(products_list);
        console.log("limor");
    }, [FetchingProductsSucced]);

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "height"}
            style={styles.searchSection}
        >
            <ScrollView>
                <Formik
                    initialValues={{
                        //setup the values for form inputs
                        productName: "",
                    }}
                    validationSchema={formSchema}
                    //onSubmit : when this form is submited we can have access to the "values"
                    onSubmit={(values) => {
                        //sent req to backend
                        console.log(values);
                        dispatch(listAction.findProductByName(values))
                            .then(async result => { //get the result from listAction.js
                                // console.log(result);
                                if (result.success) {
                                    try {
                                        // server send response with all relevant products
                                        //const obj = JSON.parse(result);
                                        //console.log(result.Pdata); 

                                        products_list = JSON.parse(result.Pdata);
                                        /*for (let i = 0; i <test.length; i++) {
                                            console.log(test[i].product_name);
                                        }

                                        console.log("******************** " + test[0].product_id);
                                        for (let i = result.length; i > 0; i--) {
                                            products_list.push(result[i]);
                                        }
                                        console.log('line 61');
                                        */
                                        console.log(products_list[2].product_name);
                                        console.log('line 64');

                                        setFetchingProductsSucced(true);

                                        // const { products } = useSelector(state => state.product);

                                        // //add all products to 'products' array
                                        // for (let i = products.length; i > 0; i--) {
                                        //     products_list.push(products[i]);
                                        // }
                                        // console.log('data in products_list:');
                                        // console.log(products_list);
                                        // console.log('linr 60 the end');



                                        //await AsyncStorage.setItem('token', result.token)
                                        //navigate to HomeScreen after success in login request
                                        // navData.navigation.navigate('Home');
                                    } catch (err) {
                                        console.log(err);
                                    }
                                } else {
                                    //this will bting the message we have in the result obj
                                    Alert.alert(result.message);
                                }
                            })
                            .catch(err => console.log(err));


                    }}
                >
                    {(props) => (
                        //props pass by formik
                        //function that returns automatically
                        <View style={styles.searchSection}>

                            <TouchableOpacity
                                onPress={props.handleSubmit}
                            >
                                <Icon style={styles.searchIcon} name="search" size={25} color="#000" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => textInput.clear()}
                            >
                                <Feather name="x" size={15} color="black" />
                            </TouchableOpacity>


                            <TextInput
                                style={styles.input}
                                placeholder="Search Product"
                                onChangeText={props.handleChange('productName')}
                                value={props.values.productName}
                                onBlur={props.handleBlur('productName')}
                                ref={input => { textInput = input }}
                            />

                            <Text>{props.touched.productName && props.errors.productName}</Text>



                        </View>
                    )}

                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>

    );

}

const PushDataToList = (products_list) => {
    console.log("products_list");
    console.log(products_list);

    console.log("PushDataToList");


}

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        backgroundColor: "#ffffff",
        //margin: 10,
        // padding: 20,
        // borderRadius: 10,
    },
    input: {
        paddingHorizontal: 50,
        paddingVertical: 8,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1.7,
    },
    form: {
        flex: 1,
        margin: 20,
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
    },
    searchIcon: {
        padding: 10,
    },
});

export default SearchProductScreen;


