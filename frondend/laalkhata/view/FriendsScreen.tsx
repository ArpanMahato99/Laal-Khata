import { StyleSheet, View } from 'react-native'
import React from 'react'
import FriendCardFragment from './fragments/FriendCardFragment'

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <FriendCardFragment />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  }
})
