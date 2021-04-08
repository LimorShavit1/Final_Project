import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Animated, TouchableHighlight, TouchableOpacity, StatusBar, Touchable } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { FloatingAction } from 'react-native-floating-action';
import { SwipeListView } from 'react-native-swipe-list-view';

import Card from '../components/Card';
import * as houseAction from '../redux/actions/houseAction';

const HomeScreen = props => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [_id, setID] = useState('');
    //const {translation} = useTranslation();

    const loadProfile = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            props.navigation.navigate('Login');
        }
        //extract data er have in the token
        const decoded = jwtDecode(token);
        setFullName(decoded.fullName);
        setEmail(decoded.email);
        setID(decoded._id);
        console.log(decoded);

    }

    const logOut = props => {
        //while logging out we want to remove our token
        AsyncStorage.removeItem('token')
            .then(() => {
                //using 'replace' make sure that we are not getting back to homeScreen by clicking back btn
                props.navigation.replace('Login')
            })
            .catch(err => console.log(err));

    }

    //this will be triggered when we load this component
    useEffect(() => {
        loadProfile();
    });
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    var lists = [];
    const { houses } = useSelector(state => state.house);
    
    //filter to see only my or shared with me lists(improve runtime*)

    for (let i = houses.length; i > 0; i--) {
        for (let j = 0; j < houses[i-1].CustumerID.length; j++)
            if (houses[i-1].CustumerID[j] == _id) {
                lists.push(houses[i-1]);
            }

    }
    /*const [listData,setListData]=useState(
            lists.map((listItam,index)=>({
                key:`${index}`,
                id:listItam._id,
                ListName:listItam.ListName,
                CustumerID:listItam.CustumerID,
                items:listItam.items,
    
            }))
        
        );*/
    useEffect(() => {
        setIsLoading(true);
        dispatch(houseAction.fetchHouses())
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

    if (lists.length == 0 && !isLoading) {
        return (
            <View style={styles.centered}>
                <Text style={styles.welcomUserText}>Welcome {fullName ? fullName : ''}</Text>
                <Text style={styles.centered}>No lists found. You could add one!</Text>

                <FloatingAction
                    position="left"
                    animated={false}
                    showBackground={false}
                    onPressMain={() => props.navigation.navigate('NewList', { CustumerID: _id })}
                />
            </View>

        );
    }

   
    const closeRow = (rowMap,rowKey) =>{
    

    }

    const deleteRow = (rowMap,rowKey) =>{}

    const HiddenItemWithAction = props =>{
        const {onClose,onDelete} =props;

        return (
            <View style={styles.rowBack}>
                
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
                    <Text>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>    

        );
    }

    const renderHiddenItem = (data, rowMap) => {
 
        return (
            
            <HiddenItemWithAction
                
                data ={data}
                rowMap ={rowMap}
                keyExtractor={item => item.index}
                onClose={() => closeRow(rowMap,)}
                onDelete={() => deleteRow(rowMap,data.item.rowKey)}

            />
        );

    };
    return (

        <View style={styles.container}>
            <Text style={styles.welcomUserText}>Welcome {fullName ? fullName : ''}</Text>
            <SwipeListView
                data={lists}

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
            />
            <FloatingAction
                position="left"
                animated={false}
                showBackground={false}
                onPressMain={() => props.navigation.navigate('NewList', { CustumerID: _id })}
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
        fontWeight: 'bold'
    },
    rowFront:{
        backgroundColor:'#FFF',
        borderRadius:5,
        height:60,
        margin:5,
        marginBottom:15,
        shadowColor:'#999',
        shadowOffset:{width:0, height:1},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:5,
    },
    rowFrontVisiable:{
        backgroundColor:'#FFF',
        borderRadius:5,
        height:60,
        padding:10,
        marginBottom:15,
    },
    rowBack:{
        alignItems:'center',
        backgroundColor:'#DDD',
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingLeft:10,
        margin:10,
        marginBottom:10,
        borderRadius:10,
    },
    backRightBtn: {
        alignItems:'flex-end',
        bottom:0,
        justifyContent:'center',
        top: 0,
        width: 75,
        paddingRight:17,
    },
    backRightBtnLeft:{
        backgroundColor: '#1f65ff',
        height:'98%',
        
    },
    backRightBtnRight:{
        backgroundColor:'red',
        right:0,
        borderTopRightRadius: 5,
        borderBottomRightRadius:5,
        height:'98%',
    },


})

export default HomeScreen;