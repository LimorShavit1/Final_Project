import React, { useState } from 'react';
import { StyleSheet,View, Text, Image,TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const FavoriteList = ({ saveClicked, backToList, ...props }) => {

    
    const toDo = (userID, ListName, items) => {
        console.log("toDo");
        saveClicked(userID, ListName, items);
        //backToList(userID, ListName, items);
    }
    
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('HistoryListDitails', {
            items: props.item.items
        })}>
            <View style={styles.listItem}>
                <Image
                    source={{ uri: 'https://cdn1.iconfinder.com/data/icons/business-startup-48/64/1076-512.png' }}
                    style={styles.coverImage}

                />

                <View style={styles.description}>
                    <Text style={styles.title}>{props.item.ListName}</Text>

                    <Text style={styles.descriptionText}>
                        סה"כ:{'\u20AA'}{props.item.price}
                    </Text>
                    <Text style={{ fontSize: 11 }}>
                        תאריך הזמנה:{props.item.date.substring(4, 21)}
                    </Text>


                </View>
                <MaterialCommunityIcons style={styles.icon} size={40} name={'recycle'}
                    onPress={() => {
                       // {toggleModalVisibility}
                       { toDo(props.userID, props.item.ListName, props.item.items) }
                    }} />

            </View>

         
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',


    },

    listItem: {
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    coverImage: {
        width: 80,
        height: 80,
        borderRadius: 8
    },

    title: {
        fontSize: 18,
        width: 200,

    },
    icon: {

        color: '#f08080',
        width: 50,
    },

    description: {
        margin: 10
    },
    descriptionText: {
        fontSize: 16,
        color: 'gray'
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
});
export default FavoriteList;