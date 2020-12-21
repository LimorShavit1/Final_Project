import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';


const HomeScreen = props => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');


    const loadProfile = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            props.navigation.navigate('Login');
        }
        //extract data er have in the token
        const decoded = jwtDecode(token);
        setFullName(decoded.fullName);
        setEmail(decoded.email);
        console.log(decoded);

    }

    const logOut = props => {
        //while logging out we want to remove our token
        AsyncStorage.removeItem('token')
        .then(()=>{
            //using 'replace' make sure that we are not getting back to homeScreen by clicking back btn
            props.navigation.replace('Login')
        })
        .catch(err => console.log(err));

    }

    //this will be triggered when we load this component
    useEffect(() => {
        loadProfile();
    });

    return (

        <View>
            <Text>Welcome {fullName ? fullName : ''}</Text>
        </View>
    );
}

const styles = StyleSheet.create({


})

export default HomeScreen;