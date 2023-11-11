import { SafeAreaView, StatusBar,  } from 'react-native'
import React from 'react'
import {styles} from './styles';
import LoginScreen from './view/screens/LoginScreen';
import MainScreen from './view/screens/MainScreen';

export default function App() {

  return (
    <SafeAreaView style={styles.darkAppContainer}>
      <StatusBar backgroundColor={styles.darkAppContainer.backgroundColor}/>
      {/* <LoginScreen /> */}
      <MainScreen />
    </SafeAreaView>
  )
}

