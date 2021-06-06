import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, ActivityIndicator, FlatList, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from '../hooks/api.hook';

import RequestCard from '../components/RequestCard';
import * as listAction from '../redux/actions/listAction';


const RequestsScreen = props => {

    const user = useSelector(state => state.auth.user);
    const { requests } = useSelector(state => state.list);
    const { houses } = useSelector(state => state.house);
    const {requestsLength} = useSelector(state => state.list);

    //const [reqLength, setReqLength] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listAction.getMyRequests(user))
    }, [requests])

    //const lrn_req = 
    async() => {console.log(" requests:", await requests.length)};
    // if (requests.length < 1) {
    //     return (
    //         <SafeAreaView style={styles.centered}>
    //             <View style={styles.centered}>
    //                 <Text style={styles.centered}>אין בקשות חדשות</Text>
    //             </View>
    //         </SafeAreaView>

    //     );

    // }

    return (

        <View style={{ flex: 1 }}>
            <FlatList
                data={requests}
                keyExtractor={item => item._id}
                renderItem={
                    ({ item }) => {
                        return (
                            <RequestCard
                                requestId={item._id}
                                ListName={item.ListName}
                                listId={item.listId}
                                senderId={item.senderId}
                                senderName={item.senderName}
                            />
                        )
                    }
                }
            />
        </View>
    );
}


const styles = StyleSheet.create({

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    UserText: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: '100%',
        marginTop: 40,
        fontSize: 25,

    },
    UserMsg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'bold',
    },

});

export default RequestsScreen;