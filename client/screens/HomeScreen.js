import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, ActivityIndicator, Animated, TouchableHighlight, TouchableOpacity, StatusBar, Touchable, SegmentedControlIOSComponent } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { FloatingAction } from 'react-native-floating-action';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import { SearchBar } from 'react-native-elements';

import Card from '../components/Card';
import * as houseAction from '../redux/actions/houseAction';

const HomeScreen = props => {
    const user = useSelector(state => state.auth.user)
    const [search, setSearch] = useState('');


    const logOut = props => {
        //while logging out we want to remove our token
        AsyncStorage.removeItem('token')
            .then(() => {
                //using 'replace' make sure that we are not getting back to homeScreen by clicking back btn
                props.navigation.replace('Login')
            })
            .catch(err => console.log(err));

    }

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const { houses } = useSelector(state => state.house);


    useEffect(() => {


        setIsLoading(true);
        dispatch(houseAction.fetchHouses(user._id))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (houses.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.welcomUserText}>Welcome {user.fullName}</Text>
                <Text style={styles.centered}>No lists found. You could add one!</Text>

                <FloatingAction
                    position="left"
                    animated={false}
                    showBackground={false}
                    onPressMain={() => props.navigation.navigate('NewList', { CustumerID: user._id })}
                />
            </View>

        );
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }



    const deleteRow = (rowMap, rowKey) => {
        dispatch(houseAction.deleteList(rowKey))
            .then(() => {
                Alert.alert('Deleted Successfully');
            })
            .catch(() => {

                Alert.alert('An error occurred. Try Again', [{ text: 'OK' }])
            })


    }

    const HiddenItemWithAction = props => {
        const { onClose, onDelete, onShare } = props;

        return (
            <View style={styles.rowBack}>

                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft2]} onPress={onShare}>
                    <AntDesign name="adduser" size={25} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
                    <MaterialCommunityIcons name="close-circle-outline" size={25} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
                    <MaterialCommunityIcons name="trash-can-outline" size={25} color='#fff' />
                </TouchableOpacity>

            </View>

        );
    }

    const renderHiddenItem = (data, rowMap) => {

        return (

            <HiddenItemWithAction

                data={data}
                rowMap={rowMap}

                onClose={() => closeRow(rowMap, data.item._id)} //close the swipe row
                onDelete={() => deleteRow(rowMap, data.item._id)} //delete item from data base
                onShare={() => console.warn('TODO')} //share the list
            />
        );

    };
    return (



        <View style={styles.container}>

            <SearchBar
                inputStyle={{ backgroundColor: 'white' }}
                containerStyle={{
                    borderWidth: 1, borderRadius: 5, backgroundColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderTopColor: 'transparent',
                }}
                round
                searchIcon={{ size: 24 }}

                onChangeText={setSearch}
                onClear={(text) => console.log(text)}
                placeholder="Type Here..."
                value={search}

            />


            <Text style={styles.welcomUserText}>{`Welcome ${user.fullName}`}</Text>

            <SwipeListView
                data={search? houses.filter(h => h.ListName.includes(search)) : houses}

                keyExtractor={item => item._id}

                renderItem={({ item }) => (
                    <Card

                        navigation={props.navigation}
                        CustumerID={item.CustumerID}
                        ListName={item.ListName}
                        items={item.items}
                        id={item._id}

                    />
                )}

                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                disableRightSwipe
            />
            <FloatingAction
                position="left"
                animated={false}
                showBackground={false}
                onPressMain={() => props.navigation.navigate('NewList', { CustumerID: user._id })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,

    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomUserText: {
        textAlign: 'center',
        fontWeight: 'bold',
       width: '100%'
    },
    rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisiable: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 10,
        margin: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        top: 0,
        width: 50,
        paddingRight: 17,
    },
    backRightBtnLeft2: {

        backgroundColor: '#32cd32',
        height: '98%',
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        height: '98%',

    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        height: '98%',
    },


})

export default HomeScreen;