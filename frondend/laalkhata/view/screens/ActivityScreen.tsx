import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import ActivityCardFragment from '../fragments/ActivityCardFragment'
import { Transactions } from '../../data/Transactions'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { ActivityStackParamList } from '../navigators/ActivityStackNavigator'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'

type ActityProps = NativeStackScreenProps<ActivityStackParamList, 'Activity'>;

export default function ActivityScreen({navigation}: ActityProps) {
  return (
    <View>
      <View style={styles.headerIconContainer}>
        <TouchableOpacity style={styles.headerIcon}>
            <FontAwesomeIcon 
                icon={faFilter}
                color={styles.headerIcon.color} 
                size={styles.headerIcon.fontSize}
            />
        </TouchableOpacity>
      </View>
      <FlatList 
        style={styles.flatList}
        data={Transactions}
        keyExtractor={item => item.transactionId}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("TransactionDetails", {transactionId: item.transactionId})}
          >
            <ActivityCardFragment {...item} />
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