import { SafeAreaView, StatusBar,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import {styles} from './styles';
import LoginScreen from './view/screens/LoginScreen';
import MainScreen from './view/screens/MainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [isUserSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    const getLoggedInData = async () => {
      try {
        const signupData = await AsyncStorage.getItem('isUserSignedIn');
        console.log(signupData);
        if(signupData !== null) {
          setUserSignedIn(JSON.parse(signupData));
        }
      } catch (e) {}
    }

    getLoggedInData();
  }, [isUserSignedIn])
  

  return (
    <SafeAreaView style={styles.darkAppContainer}>
      <StatusBar backgroundColor={styles.darkAppContainer.backgroundColor}/>
      {
        isUserSignedIn ? <MainScreen /> : <LoginScreen />
      }
    </SafeAreaView>
  )
}

