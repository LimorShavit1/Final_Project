import React, { useEffect, useState, useCallback } from 'react';
import { RefreshControl, SafeAreaView, Modal, TextInput, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FloatingAction } from 'react-native-floating-action';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Items from '../components/Items';
import { IconButton, Colors } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useApi } from '../hooks/api.hook';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get("window");

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const HomeDetailsScreen = props => {
  const api = useApi();
  const { houseId } = props.route.params;
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  // This is to manage TextInput State
  const [inputValue, setInputValue] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  //manage reload 
  const onRefresh = async () => {
    setRefreshing(true);
    const houseData = await api.getHouseDetails(houseId);

    setProducts([...houseData.items]);
  // console.log(products);
    setRefreshing(false);
};
const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(false);
const [products, setProducts] = useState([]);

useEffect(() => {
  const init = async () => {
    setIsLoading(true);
    try {
      const houseData = await api.getHouseDetails(houseId);
      setProducts(houseData.items);
      console.log(products);
    } finally {
      setIsLoading(false);
    }
  }
  const unsubscribe = props.navigation.addListener('focus', init);

  return unsubscribe;
}, [])

if (isLoading) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" />
    </View>
  );
}

if (products.length == 0 && !isLoading) {
  return (
    <SafeAreaView style={styles.centered}>

      <Text style={styles.centered}>No Items found. You could add one!</Text>

      <FloatingAction contentContainerStyle={styles.scrollView}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
        position="left"
        animated={false}
        showBackground={false}
        onPressMain={() => props.navigation.navigate('SearchProduct', { listId: houseId })}

      />
    </SafeAreaView>

  );
}
const toggleModalVisibility = () => {

  setModalVisible(!isModalVisible);
};

const _updateDBQuantity = async () => {
  for (let i = 0; i < products.length; i++) {
    await api.updateQuantity(houseId, products[i]._id, products[i].quantity);

  }
}
const _combined = () => {
  setIsLoading(true);
  toggleModalVisibility();
  _getLocation();

}

const _getLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    console.log('PERMISSION NOT GRANTED!');
  }

  const location = await Location.getCurrentPositionAsync();
  setIsLoading(false);
  props.navigation.navigate('Top5', {
    location_latitude: location.coords.latitude, location_longitude: location.coords.longitude, listid: houseId, radius: inputValue ? inputValue : "1500", products: products
  })
}

const closeRow = (rowMap, rowKey) => {
  if (rowMap[rowKey]) {
    rowMap[rowKey].closeRow();
  }
}



const deleteRow = async (rowMap, productId) => {


  setProducts(prevProducts => prevProducts.filter(x => x._id !== productId))

  await api.deleteProduct(houseId, productId);
}

const changeProductQuantity = (productId, newquantity) => {

  setProducts(prevProducts => {
    prevProducts.find(p => p._id === productId).quantity = newquantity;

    return [...prevProducts];
  })
}

const HiddenItemWithAction = props => {
  const { onClose, onDelete } = props;

  return (
    <View style={styles.rowBack}>


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

    />
  );

};

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.row}>
      <IconButton
        icon="pencil"
        color={Colors.red500}

        onPress={() => _updateDBQuantity()}
      />
      <Text>שמור שינויים</Text>

    </View>

    <SwipeListView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      data={products}
      keyExtractor={item => item._id + item.quantity}

      renderItem={({ item }) => (
        <Items
          onQuantityChange={changeProductQuantity}
          navigation={props.navigation}
          item={item}


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
      onPressMain={() => props.navigation.navigate('SearchProduct', { listId: houseId })}

    />

    <Button title="לעבור לחיפוש סופרמרקט" color="#66CDAA" onPress={toggleModalVisibility} />
    <Modal animationType="slide"
      transparent visible={isModalVisible}
      presentationStyle="overFullScreen"
      onDismiss={() => setModalVisible(false)}>
      <View style={styles.viewWrapper}>
        <View style={styles.modalView}>
          <Text>ברדיוס של כמה מטרים לחפש?</Text>
          <TextInput placeholder="Enter something..."
            value={inputValue} style={styles.textInput} keyboardType="numeric"
            onChangeText={(value) => setInputValue(value)} />

          {/** This button is responsible to close the modal */}
          <View style={styles.row}>
          <Button title="Go " onPress={_combined} />
          <Button title="Close " onPress={toggleModalVisibility} />
          </View>
        </View>
      </View>
    </Modal>


  </SafeAreaView>

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
  welcomUserText: {
    textAlign: 'center',
    fontWeight: 'bold'
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
    width: 75,
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

  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) },
    { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
  },
})
export default HomeDetailsScreen;