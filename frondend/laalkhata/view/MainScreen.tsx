import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavigationTabFragment from './fragments/BottomNavigationTabFragment'



export default function MainScreen() {
  return (
    <NavigationContainer>
        <BottomNavigationTabFragment />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})