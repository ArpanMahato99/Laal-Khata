import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faFileInvoiceDollar} from '@fortawesome/free-solid-svg-icons'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { FriendStackParamList } from '../navigators/FriendsStackNavigation'
import { useNavigation } from '@react-navigation/native'
import { getTime } from '../../formatter'
import { styles as appStyles } from '../../styles'

type TransactionDeatils = NativeStackScreenProps<FriendStackParamList, 'TransactionDetails'>

export default function TransactionDetails(props: TransactionDeatils) {
  const navigation = useNavigation<NativeStackNavigationProp<FriendStackParamList>>();
  const transaction: Transaction = props.route.params.item;
  const transactionDetails = Object.entries(transaction.transactionDetails);
  const getUsersApiCallData = [
    {
      userId: "6547d449b51c515e9e34c728",
      fullName: "Arpan Mahato",
      email: "test@abc.com",
      phoneNumber: "8797021466",
      upiId: "text@sbi.com"
    },
    {
        userId: "6547d49bb51c515e9e34c72a",
        fullName: "Joy",
        email: "test1@abc.com",
        phoneNumber: "8797021467",
        upiId: "text1@sbi.com"
    },
  ]
  
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon 
            icon={faFileInvoiceDollar} 
            size={150}
            color={appStyles.darkFontColor.color}
            />
        </View>
        <Text style={styles.total}>₹ {transaction.totalAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text>Txn ID: {transaction.transactionId}</Text>
        <Text>Paid By: {transaction.paidBy}</Text>
        <Text>Timestamp: {getTime(transaction.timestamp)}</Text>
        <FlatList
          data={transactionDetails}
          keyExtractor={item=> item[0]}
          renderItem={({ item }) => (
            <View>
              <Text>User ID: {item[0]}</Text>
              <Text>Amount: {item[1].amount}</Text>
              <Text>Status: {item[1].status}</Text>
              {/* Add more details as needed */}
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  iconContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#2C3335',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 0.25,
  },
  total: {
    marginTop: 20,
    fontSize: 40,
    fontWeight: 'bold'
  },
  detailsContainer: {
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 0.25,
    marginHorizontal: 20,
    marginVertrical: 20
  }
})