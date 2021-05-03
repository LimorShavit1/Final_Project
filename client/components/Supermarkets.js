import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';


const Supermarkets = ({isOpen,...props}) => {

    return (
        <TouchableOpacity>
            <View style={styles.listItem}>
                <Image
                    source={{ uri: props.uri }}
                    style={styles.coverImage}
                />
                <View style={styles.metaInfo}>
                    <Text style={styles.title}>{props.placeName}</Text>
                </View>
                
                <Text note style={{ marginTop: 5, color: isOpen ? 'green' : 'red' }}>{isOpen ? 'Open' : 'Closed'}</Text>

            </View>

        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'

    },
    text: {
        fontSize: 20,
        color: '#101010',
        marginTop: 60,
        fontWeight: '700'
    },
    text2: {
        fontSize: 10,
        marginTop: 60,
        fontWeight: '700'
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
    metaInfo: {
        marginLeft: 10
    },
    title: {
        fontSize: 18,
        width: 200,
        padding: 10
    }
});

export default Supermarkets;