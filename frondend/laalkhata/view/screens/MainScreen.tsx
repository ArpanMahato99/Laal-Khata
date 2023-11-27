import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from '../navigators/BottomTabNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserConnections, getUserTransactions } from '../../api';





export default function MainScreen() {

  const [isUserSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if(userData !== null) {
          const user = JSON.parse(userData)
          console.log(user);
          console.log(user.userId);
          
          const connectionResponse = await getUserConnections(user.userId);
          const transactionResponse = await getUserTransactions(user.userId);
          console.log("TRANSACTION RESPONSE", transactionResponse);
          console.log("CONNECTION RESPONSE", connectionResponse);
          if(connectionResponse.status === 200) {
            console.log("CONENCTIONS: ", await connectionResponse.json());
          }
          if (transactionResponse.status === 200) {
            console.log("TRANSATIONS: ", await transactionResponse.json());
          }
          
        }
      } catch (e) {}
    }

    getUserData();
  }, [isUserSignedIn])

  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({})