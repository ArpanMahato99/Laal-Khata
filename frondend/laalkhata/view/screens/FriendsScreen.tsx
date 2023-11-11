import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import type { PropsWithChildren } from 'react'
import FriendCardFragment from '../fragments/FriendCardFragment'
import { connections } from '../../data/Connections'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { FriendStackParamList } from '../navigators/FriendsStackNavigation'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type FriendProps = NativeStackScreenProps<FriendStackParamList, 'FriendsScreen'>;

export default function FriendsScreen({navigation}: FriendProps) {
  return (
    <View >
      <View style={styles.headerIconContainer}>
        <TouchableOpacity style={styles.headerIcon}>
            <FontAwesome5Icon 
                name='user-plus' 
                color={styles.headerIcon.color} 
                size={styles.headerIcon.fontSize}
                onPress={() => navigation.navigate('AddFriend')}
            />
        </TouchableOpacity>
      </View>
      <FlatList
        data={connections}
        keyExtractor={item => item.connectionId}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FriendsTransaction', item)}
          >
            <FriendCardFragment {...item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerIconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 50
  },
  headerIcon: {
    marginHorizontal: 15,
    color: '#ffffff',
    fontSize: 25
  }, 
  flatList: {
    height: "95%", // Set the height of the FlatList
    marginBottom: 10
  },
   
})
