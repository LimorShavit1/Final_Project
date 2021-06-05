import React from 'react';
import { StyleSheet, TextField, ImageBackground, TextInput, Text, Image, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'; // for validation
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import * as authAction from '../redux/actions/authAction';


//schema for the validation
const formSchema = yup.object({
    fullName: yup.string().required().min(2),
    email: yup.string().email().required(), // check that the data is valid email & this is requierd field to login
    password: yup.string().required().min(6)
})
//navData: LoginScreen component defined in stack navigator it gets spacial props to navigate 
const RegisterScreen = navData => {

    const dispatch = useDispatch();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <Formik
                    initialValues={{
                        //setup the values for each input in the form
                        fullName: "",
                        email: "",
                        password: ""
                    }}
                    validationSchema={formSchema}
                    //onSubmit : when this form is submited we can have access to the "values"
                    onSubmit={(values) => {
                        values.email = values.email.toLowerCase();
                        dispatch(authAction.registerUser(values))
                            .then(async result => {
                                if (result.success) {
                                    try {
                                        await AsyncStorage.setItem('token', result.token)
                                        //navigate to HomeScreen after successful registeration
                                        //the 'result' obj contain the token
                                        navData.navigation.navigate('Home');
                                    } catch (err) {
                                        console.log(err);
                                    }
                                } else {
                                    Alert.alert('Registration failed. Try Again');
                                }
                            })
                            .catch(err => console.log(err));
                    }}
                >
                    {(props) => (
                        
                        <View style={styles.container}>

                            <Image source={require('../assets/images/mobileCart.png')} style={styles.image} />


                            <View>
                                <TextInput style={styles.input}
                                    placeholder="Full Name"
                                    placeholderTextColor="#fff"
                                    onChangeText={props.handleChange('fullName')}
                                    value={props.values.fullName}
                                    onBlur={props.handleBlur('fullName')}
                                />
                                <Text>{props.touched.fullName && props.errors.fullName}</Text>

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
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>

                                <View style={styles.registerContainer}>
                                    <Text style={styles.registerText}>Have an account?</Text>
                                    <TouchableOpacity onPress={() => navData.navigation.navigate('Login')}>
                                        <Text style={styles.registerButton}> Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}

                </Formik>
            </ScrollView>
        </KeyboardAvoidingView >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        alignItems: 'center',
        marginBottom: 40
    },
    image: {
        marginTop: 60,
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
        width: 300,
        backgroundColor: '#d3d3d3',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#ffffff',
        textAlign: 'center'
    },
    registerContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    registerText: {
        color: "#738289",
        fontSize: 16
    },
    registerButton: {
        color: "#738289",
        fontSize: 16,
        fontWeight: "bold"
    }

})

export default RegisterScreen;