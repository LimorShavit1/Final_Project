import React,{ useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useApi } from '../hooks/api.hook';
const OldList = ({userID,removeFav, addFav, isLiked, ...props }) => {
  
    return (
        <TouchableOpacity>
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
                <MaterialIcons style={styles.icon} size={40} name={isLiked ? 'favorite' : 'favorite-border'}
                    onPress={() => {
                        isLiked ?
                        removeFav(props.item._id) : addFav(props.item._id);
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

        color: "#72bcd4",
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
export default OldList;