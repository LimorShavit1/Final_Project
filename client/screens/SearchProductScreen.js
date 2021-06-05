import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'; // for validation
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements'
import { Feather } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import * as listAction from '../redux/actions/listAction';
import { useApi } from '../hooks/api.hook';
import HomeDetailsScreen from '../screens/HomeDetailsScreen'



//schema for input validation 
const formSchema = yup.object({
    productName: yup.string().required().min(2)
});

const SearchProductScreen = props => {

    const api = useApi();

    let textInput = '';
    const { listId } = props.route.params;
    console.log("listID in SearchProductScreen:", listId);

    const dispatch = useDispatch();
    var products_list = [];

    const [FetchingProductsSucced, setFetchingProductsSucced] = useState(false);
    const [ListId, setListId] = useState(listId);
    const [Product, setProduct] = useState('');
    const [ProductsList, setProductsList] = useState([]);

    useEffect(() => {

    }, [FetchingProductsSucced,Product]);

    const _addItem = async (product_name,product_unit_name,manufacturer_id,product_barcode,product_description,quantity,manufacturer_name) => {
        try{
            const product= await api.addProduct(listId,product_name,product_unit_name,manufacturer_id,product_barcode,product_description,quantity,manufacturer_name);
           
            Alert.alert('Created Successfully');
        } catch (e){
            Alert.alert('An error occurred. Try Again', [{text: 'OK'}]);
        }
        
       
    }

    const onSubmit = (values) => {
        //sent req to backend
        values.productName = values.productName.trim();
        setProduct(values.productName);

        dispatch(listAction.findProductByName(values))
            .then(async result => { //get the result from listAction.js

                if (result.success) {
                    try {
                        //Pdata --> from backend

                        //reset products_list
                        products_list = [];
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
    }

    //render ProductCard component
    if (FetchingProductsSucced) {
        if (ProductsList) {
            products_list = ProductsList;
           
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "height"}
            style={styles.searchSection}
        >
            <View>
                <View>
                    <ScrollView>
                        <Formik
                            initialValues={{
                                //setup the values for form inputs
                                productName: "",
                            }}
                            validationSchema={formSchema}
                            //onSubmit : when this form is submited we can have access to the "values"
                            onSubmit={onSubmit}
                        >
                            {(props) => (
                                //props pass by formik
                                //function that returns automatically
                                <View style={styles.listSearchConteiner}>
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

                                </View>
                            )}

                        </Formik>
                    </ScrollView>
                </View>
                <View>
                    {ProductsList && ProductsList.length > 0 && <View >
                        <FlatList
                            data={ProductsList[0]}
                            keyExtractor={item => item.product_barcode}
                            renderItem={({ item }) => (
                                // move to ProductCard component & send this props:
                                <ProductCard
                                    product_name={item.product_name}
                                    product_barcode={item.product_barcode}
                                    product_unit_name={item.product_unit_name}
                                    manufacturer_id={item.manufacturer_id}
                                    product_description={item.product_description}
                                    manufacturer_name={item.manufacturer_name}
                                    product_image={item.product_image}
                                    addItem={_addItem}
                                    quantity={'1'}
                                    list_id={ListId}
                                />

                            )}
                        />
                    </View>}
                </View>
            </View>
        </KeyboardAvoidingView>

    );

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
    viewProducts: {
        marginTop: 120,
        width: 300,
        backgroundColor: '#f08080',
        borderRadius: 25,
        padding: 10,
        fontSize: 16,
        marginVertical: 10,
        //marginTop: 20
    },
    listSearchConteiner: {
        flexDirection: 'column'
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
    errorView: {
        marginTop: 5,
        marginLeft: 110,

    },
    errorTxt: {
        color: '#ff4500'
    },
});

export default SearchProductScreen;