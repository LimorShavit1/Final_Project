import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import OldList from '../components/OldList';
import { useApi } from '../hooks/api.hook';



const OldListsScreen = props => {
    const { userID } = props.route.params;
    const api = useApi();


    const [isLoading, setIsLoading] = useState(false);
    const [oldList, setoldList] = useState([]);
    const [favorites, setFavorites] = useState([]);



    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            try {
                const [oldData, favoritesList] = await Promise.all([api.getMyHistory(userID), api.getUserFavorites(userID)]);
                setoldList(oldData);
                setFavorites(favoritesList);

            } finally {
                setIsLoading(false);
            }
        }
        init();
    }, [])

    const _addFav = async (HistoryId) => {

        await api.addFav(userID, HistoryId);
        setFavorites(prev => [...prev, HistoryId]);
    }
    const _removeFav = async (HistoryId) => {
        await api.removeFav(userID, HistoryId);
        setFavorites( prev => prev.filter(favoriteId => favoriteId !== HistoryId));
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

    return (

        <View style={styles.container}>


            <FlatList
                data={oldList}

                keyExtractor={item => item._id}

                renderItem={({ item }) => (
                    <OldList

                        navigation={props.navigation}
                        item={item}
                        isLiked={favorites.includes(item._id)}
                        addFav={_addFav}
                        removeFav={_removeFav}
                        userID={userID}
                        


                    />
                )}
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


})
export default OldListsScreen;