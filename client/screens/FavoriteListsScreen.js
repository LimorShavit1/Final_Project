import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Modal, TextInput, Alert, Text, View, ActivityIndicator, FlatList } from 'react-native';
import FavoriteList from '../components/FavoriteList';
import { useApi } from '../hooks/api.hook';
import { useDispatch, useSelector } from 'react-redux';
import * as houseAction from '../redux/actions/houseAction';
import {fetchFavorites} from '../redux/actions/favoritesAction';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get("window");

const FavoriteListsScreen = props => {
    const api = useApi();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const [isLoading, setIsLoading] = useState(false);
    const [oldList, setoldList] = useState([]);
    const {favoriteItemIds, isInitialized: isFavoritesInitialized} = useSelector(state => state.favorites);
    // This is to manage Modal State
    const [isModalVisible, setModalVisible] = useState(false);
    const [clicked,setclicked]=useState({CustumerID:"", ListName:"", items:[]})
    // This is to manage TextInput State
    const [inputValue, setInputValue] = useState("");

  
    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            try {
                const oldData = await api.getMyHistory(user._id);
               
                setoldList(oldData);
                
                if(!isFavoritesInitialized){
                    await dispatch(fetchFavorites(user._id));
                }

        


            } finally {
                setIsLoading(false);
            }
        }
        init();
    }, [])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (favoriteItemIds.length == 0 && !isLoading) {
        return (
            <View style={styles.centered}>

                <Text style={styles.centered}>לא נמצאו רשימות</Text>


            </View>

        );
    }
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
      };

    const _saveClicked=(CustumerID, ListName, items)=>{
        toggleModalVisibility();
        console.log(ListName);
        const newList={CustumerID, ListName, items}
        setclicked(newList);
        
    }

    const _sayNo=()=>{
        
        toggleModalVisibility();
        _backToList();
    }
    const _sayYes=()=>{
        
        toggleModalVisibility();
        const recycledList = {CustumerID:clicked.CustumerID,ListName: inputValue ? inputValue: "No Name" , items:clicked.items};
        setclicked(recycledList);
        _backToList(recycledList);
    }

    

    const _backToList = (recycledList) => {
       
        dispatch(houseAction.createHome(recycledList || clicked))
            .then(() => {
                setIsLoading(false);
                Alert.alert('Recycled Successfully');
            })
            .catch(() => {
                setIsLoading(false)
                Alert.alert('An error occurred. Try Again', [{ text: 'OK' }])
            })
    }

    return (
        <View style={styles.container}>
            <FlatList

                data={oldList.filter(item => favoriteItemIds.includes(item._id))}
                keyExtractor={item => item._id}

                renderItem={({ item }) => (
                    <FavoriteList

                        navigation={props.navigation}
                        item={item}
                        userID={user._id}
                        backToList={_backToList}
                        saveClicked={_saveClicked}



                    />
                )}
            />
            
            <Modal animationType="slide"
                transparent visible={isModalVisible}
                presentationStyle="overFullScreen"
                onDismiss={() => setModalVisible(false)}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text>לשנות את השם לרשימה?</Text>
                        <TextInput placeholder="Enter something..."
                            value={inputValue} style={styles.textInput} 
                            onChangeText={(value) => setInputValue(value ? value: ["No Name"])} />

                        {/** This button is responsible to close the modal */}
                        <View style={styles.row} >
                        <Button color='#f08080'  title="No " onPress={_sayNo} />
                         <Button color='#f08080' title="Yes" onPress={_sayYes}/> 
                         <Button color='#f08080' title="Close " onPress={toggleModalVisibility}/>
                        </View>
                    </View>
                </View>
            </Modal>
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
export default FavoriteListsScreen;