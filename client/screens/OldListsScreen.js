import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import OldList from '../components/OldList';
import { useApi } from '../hooks/api.hook';
import { fetchFavorites, addToFavorites, removeFromFavorites } from '../redux/actions/favoritesAction';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const OldListsScreen = props => {
    const { userID } = props.route.params;
    const api = useApi();
    const { favoriteItemIds, isInitialized: isFavoritesInitialized } = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [oldList, setoldList] = useState([]);




    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            try {
                const oldData = await api.getMyHistory(userID);
                setoldList(oldData);

                if (!isFavoritesInitialized) {
                    await dispatch(fetchFavorites(userID));
                }

            } finally {
                setIsLoading(false);
            }
        }
        init();
        const unsubscribe = props.navigation.addListener('focus', init);
        return unsubscribe;
    }, [])

    const _addFav = async (HistoryId) => {

        await api.addFav(userID, HistoryId);
        dispatch(addToFavorites(HistoryId));
    }
    const _removeFav = async (HistoryId) => {

        await api.removeFav(userID, HistoryId);
        dispatch(removeFromFavorites(HistoryId));
    }


    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (oldList.length == 0 && !isLoading) {
        return (
            <View style={styles.centered}>

                <Text style={styles.centered}>לא בוצעו רכישות</Text>


            </View>

        );
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }
    const AddPic=(rowMap, rowKey,uri)=>{
       props.navigation.navigate('AboutScreen', {
            oldListId: rowKey,Imageuri:uri
        })
       
    }

    const HiddenItemWithAction = props => {
        const { onClose, onAdd, data } = props;

        return (
            <View style={styles.rowBack}>

               
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
                    <MaterialCommunityIcons name="close-circle-outline" size={25} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity disabled={!!data.item.uri} style={[styles.backRightBtn, styles.backRightBtnRight, data.item.uri && {backgroundColor: 'red'}]} onPress={onAdd}>
                    <MaterialCommunityIcons name="image-plus" size={25} color='#fff' />
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
                onAdd={() => AddPic(rowMap, data.item._id,data.item.uri)} //delete item from data base
            />
        );

    };

    return (

        <View style={styles.container}>


            <SwipeListView
                data={oldList}

                keyExtractor={item => item._id}

                renderItem={({ item }) => (
                    <OldList

                        navigation={props.navigation}
                        item={item}
                        isLiked={favoriteItemIds.includes(item._id)}
                        addFav={_addFav}
                        removeFav={_removeFav}
                        userID={userID}

                    />
                )}

                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                disableRightSwipe
            />
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,

    },
    row: {

        flexDirection: "row"
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        width: 70,
        paddingRight: 17,
      },
      backRightBtnLeft2: {
    
        backgroundColor: '#f08080',
        height: '100%',
      },
      backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        height: '100%',
    
      },
      backRightBtnRight: {
        backgroundColor: '#d3d3d3',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        height: '100%',
      },


})
export default OldListsScreen;