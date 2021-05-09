import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

//import screen components
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import FavoriteListsScreen from '../screens/FavoriteListsScreen';
import AddHomeScreen from '../screens/AddHomeScreen';
import OldListsScreen from '../screens/OldListsScreen';
import HomeDetailsScreen from '../screens/HomeDetailsScreen';
import Top5SuperMarketsScreen from '../screens/Top5SuperMarketsScreen';
import SearchProductScreen from '../screens/SearchProductScreen';
import HistoryListDitails from '../screens/HistoryListDitails';
import { DrawerContent } from './DrawerContent';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HeaderLeft = () => {
    const navigation = useNavigation();

    return (
        <MaterialIcons name="menu" size={24} onPress={() => { navigation.openDrawer() }} />
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator  drawerContent={props => <DrawerContent {...props} /> } >
            <Drawer.Screen
                name="Tabs Navigator"
                component={TabsNavigator}
            />
        </Drawer.Navigator>
    );
}

function FavoritesNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerLeft: () => <HeaderLeft />
            }}
        >
            <Stack.Screen name="Favorites" component={FavoriteListsScreen}  />
        </Stack.Navigator>
    );
}

function SearchListNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search List" component={SearchListScreen} options={{ headerLeft: null }} />
        </Stack.Navigator>
    );
}

function HomeStackNavigator() {
    return (
        
        <Stack.Navigator
            screenOptions={{
                headerLeft: () => <HeaderLeft />
            }}
        >
            <Stack.Screen name="Home"
                component={HomeScreen}
                
            />
           
            <Stack.Screen name="HistoryListDitails"
                component={ HistoryListDitails}

            />
            <Stack.Screen name="NewList"
                component={AddHomeScreen}

            />
            <Stack.Screen name="HomeDetails"
                component={HomeDetailsScreen}
            />
            <Stack.Screen name="Top5"
                component={Top5SuperMarketsScreen}
            />
            <Stack.Screen name="OldLists"
                component={OldListsScreen}
               
            />
             <Stack.Screen name="SearchProduct"
                component={SearchProductScreen}
               
            />


           


        </Stack.Navigator>
    );
}

function TabsNavigator() {
    return (
        <Tabs.Navigator
        
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: () => {
                        let iconName;
                        if (route.name == "Home") {
                            iconName = "home"
                        } else if (route.name == "Favorites") {
                            iconName = "favorite"
                        }
                        // else if (route.name == "Search List") {
                        //     iconName = "search"
                        // }
                        return <MaterialIcons name={iconName} size={24} />
                    }

                })}
        >
            <Tabs.Screen name="Home" component={HomeStackNavigator} />
            <Tabs.Screen name="Favorites" component={FavoritesNavigator} />
            {/* <Tabs.Screen name="Search List" component={SearchListNavigator} /> */}
        </Tabs.Navigator>
    );
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={DrawerNavigator}
                    options={{ headerLeft: null, headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />


                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                />

            </Stack.Navigator>
        </NavigationContainer >
    );
}


export default AppNavigator;