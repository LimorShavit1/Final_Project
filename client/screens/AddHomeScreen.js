import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator
} from "react-native";
import { Formik } from "formik";
import * as yup from 'yup';
import {useDispatch} from 'react-redux';

import * as houseAction from '../redux/actions/houseAction';

const formSchema = yup.object({
  CustumerID: yup.string().required().min(1),
  ListName:yup.string().required().min(1).max(30),
});

const AddHomeScreen = props => {

  const {CustumerID} = props.route.params;
  console.log(CustumerID);

 

    const [isLoading, setIsLoading] = useState(false);

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        style={{flex: 1}}
    >
      <ScrollView>
        <Formik
          initialValues={{
            CustumerID:CustumerID,
            Name:"",
            
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            setIsLoading(true);
            dispatch(houseAction.createHome(values))
                .then(() => {
                    setIsLoading(false);
                    Alert.alert('Created Successfully');
                })
                .catch(() => {
                    setIsLoading(false)
                    Alert.alert('An error occurred. Try Again', [{text: 'OK'}])
                })
          }}
        >
          {(props) => (
            <View style={styles.form}>
               <View style={styles.formGroup}>
                <Text style={styles.label}>List Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={props.handleChange("ListName")}
                  onBlur={props.handleBlur('ListName')}
                  value={props.values.ListName}
                />
                <Text style={styles.error}>{props.touched.ListName && props.errors.ListName}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Add List" onPress={props.handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
  },
  formGroup: {
    width: "100%",
  },
  label: {
    marginVertical: 10,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  error: {
      color: 'red'
  },
  centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default AddHomeScreen;
