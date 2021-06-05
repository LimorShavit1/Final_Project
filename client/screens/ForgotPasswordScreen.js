import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup'; // for validation
import AsyncStorage from '@react-native-community/async-storage';

import * as authAction from '../redux/actions/authAction';

//schema for the validation
const formSchema = yup.object({
    email: yup.string().email().required(), // check that the data is valid email & this is requierd field to login
    password: yup.string().required().min(6)
})

const ForgotPasswordScreen = navData => {

    const dispatch = useDispatch();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Formik
                    initialValues={{
                        //setup the values for each input in the form
                        email: "",
                        password: ""
                    }}
                    validationSchema={formSchema}
                    //onSubmit : when this form is submited we can have access to the "values"
                    onSubmit={(values) => {
                        dispatch(authAction.setUserPassword(values))
                            .then(async result => { //get the result from authActionjs: line 70
                                //the result contain the token
                                console.log(result);
                                if (result.success) {
                                    try {
                                        await AsyncStorage.setItem('token', result.token)
                                        //navigate to HomeScreen after success in login request
                                        navData.navigation.navigate('Login');
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
                            <Text style={styles.setText}>Set Your Password</Text>

                            <View>

                                <TextInput style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#fff"
                                    keyboardType="email-address"
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    onBlur={props.handleBlur('email')}
                                />

                                <Text>{props.touched.email && props.errors.email}</Text>

                                <TextInput style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#fff"
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    onBlur={props.handleBlur('password')}
                                />
                                <Text>{props.touched.password && props.errors.password}</Text>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={props.handleSubmit}
                                >
                                    <Text style={styles.buttonText}>Submit</Text>
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
        marginLeft: 60
    },
    logo: {
        alignItems: 'center',
        marginBottom: 40
    },
    image: {
        marginTop: 90,
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
        marginLeft: 50
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#ffffff',
        textAlign: 'center'
    }
})

export default ForgotPasswordScreen;