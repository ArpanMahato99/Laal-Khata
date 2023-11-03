import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {styles} from './styles';
import LoginScreen from './view/LoginScreen';
import MainScreen from './view/MainScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.darkAppContainer}>
      <StatusBar backgroundColor={"#2C3335"}/>
      {/* <LoginScreen /> */}
      <MainScreen />
    </SafeAreaView>
  )
}

