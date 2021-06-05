import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as listAction from '../redux/actions/listAction';


const RequestCard = props => {

    const [loadPage, setLoadPage] = useState(false);
    const [Requests_arr, setRequests_arr] = useState([]);


    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const { ListName, listId, senderId, senderName, requestId } = props;
    const custumerId = user._id;
    const rejectReq = { custumerId, requestId };
    const acceptReq = { listId, custumerId, requestId };

    // useEffect(() => {
    //     setLoadPage(true);
    // }, [dispatch]);

    const UserRefuseJoinToList = () => {

        dispatch(listAction.UserRefuseJoinToList(rejectReq))
            .then(async result => {
                //get the result from http POST request in --> listAction.js
                if (result.success) {
                    try {
                        console.log(result);
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    //this will bring the message we have in the result obj
                    Alert.alert(result.message);
                }
            })
            .catch(err => console.log(err));
    }

    const UserAcceptJoinToList = () => {

        dispatch(listAction.UserAcceptJoinToList(acceptReq))
            .then(async result => {
                //get the result from http POST request in --> listAction.js
                if (result.success) {
                    try {
                        console.log(result);
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    //this will bring the message we have in the result obj
                    Alert.alert(result.message);
                }
            })
            .catch(err => console.log(err));
    }

    return (

        <View style={styles.card}>

            <Text style={styles.txt}>{ListName}</Text>
            <Text style={styles.txt}>{senderName}</Text>
            <View style={styles.btn}>
                <Button
                    onPress={UserRefuseJoinToList}
                    title="סרב"
                //color="#841584"
                />
                <Text>  </Text>
                <Button
                    onPress={UserAcceptJoinToList}
                    title="אשר"
                // color="#841584"
                />
            </View>
        </View>

    );
}


const styles = StyleSheet.create({

    card: {
        flex: 1,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        elevation: 5,
        height: 100,
        margin: 10
    },
    btn: {
        flexDirection: 'row',
        marginLeft: 240,
        marginTop: -5,
    },
    txt: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 15
    },
});

export default RequestCard;