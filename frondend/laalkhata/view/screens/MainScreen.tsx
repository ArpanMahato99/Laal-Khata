import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from '../navigators/BottomTabNavigator'
import { Transactions } from '../../data/Transactions'
import TransactionCardFragment from '../fragments/TransactionCardFragment'




export default function MainScreen() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({})