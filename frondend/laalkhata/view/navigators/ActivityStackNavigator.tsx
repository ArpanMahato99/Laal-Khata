import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ActivityScreen from '../screens/ActivityScreen';
import { styles as appStyles } from '../../styles';
import TransactionDetails from '../screens/TransactionDetails';

export type ActivityStackParamList = {
  Activity: undefined,
  TransactionDetails: any,
}

const Stack = createNativeStackNavigator<ActivityStackParamList>();

export default function ActivityStackNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName='Activity'
        screenOptions={{
          headerShown: false,
          contentStyle: [appStyles.darkAppContainer]
        }} 
    >
      <Stack.Screen
        name='Activity'
        component={ActivityScreen}
      />
      <Stack.Screen
        name='TransactionDetails'
        component={TransactionDetails}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})