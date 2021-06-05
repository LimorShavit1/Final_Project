import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import NumericInput, { calcSize } from 'react-native-numeric-input'
const Card = ({ onQuantityChange, ...props }) => {

  let productNumber = props.item.quantity;
  
  let value=props.item.quantity;
  

  const productNum = ((Products) => {
    return 1
  });
  return (
    <TouchableOpacity
    /* onPress={() => props.navigation.navigate('HomeDetails', {
       houseId: props.id
     })}*/
    >
      <View style={styles.card}>

        <View style={styles.description}>
          <Text style={styles.title}>
            {props.item.product_name.length > 30 ? props.item.product_name.slice(0, 30) + '...' : props.item.product_name}
          </Text>
          <Text>{props.item.manufacturer_name}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.description}>
            <AntDesign name="barcode" size={20} color='#000000' />
            <Text style={styles.descriptionText}>
              {props.item.product_barcode}
            </Text>
          </View>
          <View style={styles.year}>
            <NumericInput type='plus-minus' onChange={number => onQuantityChange(props.item._id, number)}
              textColor='#B0228C'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='#ff6666'
              leftButtonBackgroundColor='#ff6666'
              value={value}
              valueType='real'
              minValue={1}
            />
          </View>
        </View>





      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    elevation: 5,
    height: 115,
    margin: 10
  },
  row: {
    flex: 1,
    flexDirection: "row"
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


  year: {

    height: 30,
    width: 80,
    borderRadius: 15,
    position: 'absolute',
    right: 100,


  },
  yearText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
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