import { SafeAreaView, StatusBar,  } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {styles} from './styles';
import LoginScreen from './view/screens/LoginScreen';
import MainScreen from './view/screens/MainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from './view/context/AppContext';
import AppContextProvider from './view/context/AppContextProvider';

export default function App() {

  // const {
  //   isUserSignedIn, 
  //   setUserSignedIn, 
  // } = useContext(AppContext);

  
  

  return (
      <AppContextProvider>
        <SafeAreaView style={styles.darkAppContainer}>
        <StatusBar backgroundColor={styles.darkAppContainer.backgroundColor}/>
          <MainScreen />
        </SafeAreaView>
      </AppContextProvider>
  )
}

