import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup'; // for validation
import AsyncStorage from '@react-native-community/async-storage';
import * as listAction from '../redux/actions/listAction';


const formSchema = yup.object({
    // check that the email is valid & this is requierd field to add user to current list
    email: yup.string().email().required(),
})

const AddUserScreen = props => {
    console.log("Hello");
    const user = useSelector(state => state.auth.user);
    const { listId, listName } = props.route.params;
    console.log(listId, listName);

    // const {listId} = props ;
    console.log("9999");
    console.log("senderId==" + user._id);
    // console.log("senderName=="+senderName);
    //console.log("listId==" + c);
    console.log("9999");


    const dispatch = useDispatch();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Formik
                    initialValues={{
                        //setup the values for email input in the form
                        email: "", // user's email we want to add
                        Requests: { senderId: user._id, senderName: user.fullName, listId: listId, ListName: listName }
                    }}
                    validationSchema={formSchema}
                    //onSubmit : when this form is submited we can have access to the "values"
                    onSubmit={(values) => {

                        values.email = values.email.toLowerCase();

                        dispatch(listAction.sendMyRequest(values))
                            .then(async result => { //get the result from authActionjs: line 70
                                console.log(result.success);

                                if (result.success) {
                                    try {
                                       
                                        Alert.alert(result.message);

                                        //navigate to HomeScreen after success in login request
                                        props.navigation.navigate('Home');

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
                        <View style={styles.container}>
                            <Image source={require('../assets/images/Add_User1.jpg')} style={styles.image} />

                            <Text style={styles.setText}>הוסף משתמש לרשימה על ידי הזנת אימייל</Text>

                            <View >

                                <TextInput style={styles.input}
                                    placeholder="example@example.com"
                                    placeholderTextColor="#fff"
                                    keyboardType="email-address"
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    onBlur={props.handleBlur('email')}
                                />

                                <Text>{props.touched.email && props.errors.email}</Text>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={props.handleSubmit}
                                >
                                    <Text style={styles.buttonText}>הוסף איש קשר</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                </Formik>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',

    },
    setText: {
        color: "#738289",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20
    },
    logo: {
        alignItems: 'center',
        marginBottom: 40
    },
    image: {
        marginTop: -70,
        width: 130,
        height: 130
    },
    input: {
        width: 300,
        backgroundColor: '#f08080',
        borderRadius: 25,
        padding: 16,
        fontSize: 16,
        marginVertical: 10,
        marginTop: 20
    },
    button: {
        width: 200,
        backgroundColor: '#d3d3d3',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
        marginTop: 30,
        marginLeft: 50,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#ffffff',
        textAlign: 'center'
    }
})
export default AddUserScreen;