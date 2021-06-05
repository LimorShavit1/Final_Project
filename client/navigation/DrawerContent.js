import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AntDesign } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export function DrawerContent(props) {

    const user = useSelector(state => state.auth.user)


    const logOut = props => {
        //while logging out we want to remove our token
        AsyncStorage.removeItem('token')
            .then(() => {
                //using 'replace' make sure that we are not getting back to homeScreen by clicking back btn
                props.navigation.replace('Login')
            })
            .catch(err => console.log(err));

    }

    //this will be triggered when we load this component
    useEffect(() => {
        //loadUserProfile();
    });

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={styles.wrapperView}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://thumbs.dreamstime.com/b/user-avatar-line-icon-account-outline-vector-sign-linear-style-pictogram-isolated-white-admin-profile-symbol-logo-illustration-107743603.jpg'
                                }}
                                size={50}
                            />
                            <View>
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{user.fullName}</Title>

                                    <Caption style={styles.caption}>{user.email}</Caption>
                                </View>

                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>

                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="history"
                                    size={size}
                                    color={color} />
                            )}
                            label='היסטוריית הרכישות'
                            onPress={() => props.navigation.navigate('OldLists', {
                                userID: user._id,

                            })}
                        />

                    </Drawer.Section>

                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <AntDesign name="addfile"
                                    size={size}
                                    color={color} />
                            )}
                            label='בקשות שיוך לרשימה'
                            onPress={() => props.navigation.navigate('Requests', {
                                userID: user._id,

                            })}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <AntDesign name="logout"
                            size={size}
                            color={color} />
                    )}
                    label='התנתק'
                    onPress={() => logOut(props)}
                />
            </Drawer.Section>


        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    wrapperView: {
        flexDirection: 'row',
        marginTop: 15
    },
});
