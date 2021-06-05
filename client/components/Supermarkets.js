import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Checkbox } from 'react-native-paper';

const Supermarkets = ({/*chosen,unchosen,*/isOpen, ...props }) => {
    
    // const [checked, setChecked] = React.useState(false);
    // const _buttonClick=()=>{
    //     setChecked(!checked);
    //     //chosen(props.item);
    // }
    // const _buttonClick2=()=>{
    //     setChecked(!checked);
    //     //unchosen(props.item);
    // }
    return (
        <TouchableOpacity>
            <View style={styles.listItem}>
                <Image
                    source={{ uri: props.item.uri }}
                    style={styles.coverImage}
                />
                <View style={styles.metaInfo}>
                    <Text style={styles.title}>{props.item.placeName}</Text>
                </View>

                 <Text note style={{ marginTop: 5, color: isOpen ? 'green' : 'red' }}>{isOpen ? 'Open' : 'Closed'}</Text> 
                {/* <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        checked ? _buttonClick2() : _buttonClick()
                    }}
                /> */}
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