import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { styles as appStyles } from '../../styles'
import FriendsScreen from '../screens/FriendsScreen'
import FriendsTransaction from '../screens/FriendsTransaction'
import TransactionDetails from '../screens/TransactionDetails'
import AddFriendScreen from '../screens/AddFriendScreen'

export type FriendStackParamList = {
  FriendsScreen: undefined,
  FriendsTransaction: Connection,
  TransactionDetails: Transaction,
  AddFriend: undefined
}

const Stack = createNativeStackNavigator<FriendStackParamList>();

export default function FriendsStackNavigation() {
  return (
      <Stack.Navigator 
        initialRouteName='FriendsScreen'
        screenOptions={{
          headerShown: false,
          contentStyle: [appStyles.darkAppContainer]
        }}    
      >
        <Stack.Screen
          name='FriendsScreen'
          component={FriendsScreen}
        />
        <Stack.Screen
          name='FriendsTransaction'
          component={FriendsTransaction}
        />
        <Stack.Screen
          name='TransactionDetails'
          component={TransactionDetails}
        />
        <Stack.Screen
          name='AddFriend'
          component={AddFriendScreen}
        />
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})