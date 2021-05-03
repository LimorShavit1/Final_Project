import React from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';

const Card = props => {
    return(
        <TouchableOpacity
            onPress={() => props.navigation.navigate('HomeDetails', {
              houseId: props.id,
              
            })}
        >
            <View style={styles.card}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {props.ListName.length > 30 ? props.title.slice(0, 30) + '...' : props.ListName}
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <ImageBackground source={{ uri: 'https://cdn1.iconfinder.com/data/icons/shopping-and-commerce-2-9/134/197-512.png' }} style={styles.image}>
                        
                       
                    </ImageBackground>
                </View>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>
                      Click to manage your list
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        elevation: 5,
        height: 250,
        margin: 10
      },
      titleContainer: {
        height: '15%',
        padding: 10
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray'
      },
      imageContainer: {
        width: '100%',
        height: '65%',
        overflow: 'hidden'
      },
      image: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      },
  
      description: {
        margin: 10
      },
      descriptionText: {
        fontSize: 16,
        color: 'gray'
      }
});

export default Card;