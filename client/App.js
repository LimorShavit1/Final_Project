import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <AppNavigator />
  );
}

const styles = StyleSheet.create({
});
