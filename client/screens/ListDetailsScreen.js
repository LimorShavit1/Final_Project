import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { useSelector } from 'react-redux';


const ListDetailsScreen = props => {

  // extract list ID in DB
  const { houseId } = props.route.params;

  console.log("listId:", houseId);
  const house = useSelector(state => state.house.houses.find(house => house._id == houseId));


  return (
    <View style={styles.container}>
      <Text>list screen</Text>


      <FloatingAction
        position="left"
        animated={false}
        showBackground={false}
        onPressMain={() => props.navigation.navigate('SearchProduct', { listId: houseId })}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20
  },
  heading: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  title: {
    fontSize: 24
  },
  image: {
    width: '100%',
    height: 200
  },
  group: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row'
  },
  label: {
    fontSize: 18
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1
  },
  FloatingAction: {
    flex: 1,
    marginTop: 420,
  },
});

export default ListDetailsScreen;