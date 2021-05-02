import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'; // for input validation
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { Feather } from '@expo/vector-icons';


import ProductCard from '../components/ProductCard';
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
    //const DATA = [{ s: 1 }, { s: 2 }, { s: 3 }];
    const [FetchingProductsSucced, setFetchingProductsSucced] = useState(false);
    const [ListId, setListId] = useState(listId);
    const [search, setSearch] = useState('');
    //const [Product, setProduct] = useState('');
    const [ProductsList, setProductsList] = useState([]);

    useEffect(() => {
        //console.log("limor useEffect -1-");
    }, [FetchingProductsSucced]);


    //render ProductCard component
    if (FetchingProductsSucced) {
        if (ProductsList) {
            products_list = ProductsList;
            console.log(ProductsList);
            return (
                <View style={styles.productsList}>
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

                    </View>
                    <View style={styles.errorView}>
                        <Text style={styles.errorTxt}>{props.touched.productName && props.errors.productName}</Text>
                    </View>
                    <FlatList
                        data={ProductsList[0]}
                        keyExtractor={item => item.product_barcode}
                        renderItem={({ item }) => (
                            // Move to ProductCard component & send this data as a props:
                            <ProductCard
                                product_name={item.product_name}
                                product_barcode={item.product_barcode}
                                product_unit_name={item.product_unit_name}
                                manufacturer_id={item.manufacturer_id}
                                product_description={item.product_description}
                                manufacturer_name={item.manufacturer_name}
                                product_image={item.product_image}
                                quantity={'1'}
                                list_id={ListId}
                            />

                        )}
                    />
                </View>
            );
        }
    }


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
                            .then(async result => {
                                //get the result from listAction.js
                                // console.log(result);

                                if (result.success) {
                                    try {
                                        //Pdata --> from backend
                                        products_list.push(JSON.parse(result.Pdata));

                                        setProductsList([...products_list]);
                                        setFetchingProductsSucced(true);

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
                        <View>
                            <View style={styles.searchSection}>

                                {/* <SearchBar
                                round
                                searchIcon={{ size: 24 }}
                                onChangeText={(text) => setSearch(text)}
                                onClear={(text) => setSearch('')}
                                placeholder="Type Here..."
                                value={search}
                            /> */}
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

                            </View>
                            <View style={styles.errorView}>
                                <Text style={styles.errorTxt}>{props.touched.productName && props.errors.productName}</Text>
                            </View>
                        </View>
                    )}

                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>

    );

}



const styles = StyleSheet.create({
    bigV: {
        marginTop: 100,
    },
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
    errorView: {
        marginTop: 5,
        marginLeft: 110,
    },
    errorTxt: {
        color: '#ff4500'
    },
    form: {
        //flex: 1,
        margin: 20,
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
    },
    searchIcon: {
        padding: 10,
    },
    productsList: {
        marginTop: 10,
    },
});

export default SearchProductScreen;


