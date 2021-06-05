import React, { Fragment, useState, useEffect } from 'react';
import { Alert, StyleSheet, StatusBar, TouchableOpacity, Text, Image, SafeAreaView, View, Platform, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as ImagePicker from 'expo-image-picker';
import { useApi } from '../hooks/api.hook';
import { set } from 'react-native-reanimated';

const loadingGif = require('../assets/images/please-wait.png')

const AboutScreen = props => {
  const { oldListId, Imageuri } = props.route.params;
  const [image, setImage] = useState(null);
  const api = useApi();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }

    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const pickFromCamera = async () => {

    let data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5
    })
    if (!data.cancelled) {
      setImage(data);
    }
  }
  const AddtoDB = async () => {
    try {
      await api.changeImage(oldListId, image);
      Alert.alert('Image have been choosen');
    } catch (err) {
      Alert.alert('An error occurred. Try Again', [{ text: 'OK' }])
    }

  }

    return (
      <Fragment>

        <SafeAreaView>
          <View style={styles.body}>
            <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }} >Pick Images from Camera & Gallery</Text>
            <View style={styles.btnParentSection}>

              <TouchableOpacity onPress={pickImage} style={styles.btnSection}  >
                <Text style={styles.btnText}>PICK AN IMAGE FROM CAMERA ROLL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={pickFromCamera} style={styles.btnSection}  >
                <Text style={styles.btnText}>MAKE A PHOTO     </Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={!image} onPress={AddtoDB} style={styles.btnSection2}  >
                <Text style={styles.btnText2}>ADD     </Text>
              </TouchableOpacity>
              {image ? <Image  source={{ uri: image.uri }} style={{ width: 500, height: 500 }} /> : <Image source={{ uri: 'https://icons.iconarchive.com/icons/praveen/minimal-outline/512/gallery-icon.png' }} style={{ width: 500, height: 500 }} />}
            </View> 

          </View>

        </SafeAreaView>
      </Fragment>
    );
  }
  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },

    body: {
      backgroundColor: Colors.white,
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      marginTop: 10,
      width: Dimensions.get('screen').width
    },
    btnParentSection: {
      alignItems: 'center',
      marginTop: 10
    },
    btnSection: {
      width: 225,
      height: 50,
      backgroundColor: '#DCDCDC',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginBottom: 10
    },
    btnSection2: {
      width: 225,
      height: 50,
      backgroundColor: '#f08080',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginBottom: 10
    },
    btnText: {
      textAlign: 'center',
      color: 'gray',
      fontSize: 14,
      fontWeight: 'bold'
    },
    btnText2: {
      textAlign: 'center',
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold'
    },

  });
  export default AboutScreen;