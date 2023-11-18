import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faFileInvoiceDollar, faUser} from '@fortawesome/free-solid-svg-icons'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { FriendStackParamList } from '../navigators/FriendsStackNavigation'
import { useNavigation } from '@react-navigation/native'
import { getTime } from '../../formatter'
import { styles as appStyles } from '../../styles'
import { ActivityStackParamList } from '../navigators/ActivityStackNavigator'
import { Transactions } from '../../data/Transactions'

type TransactionDeatils = NativeStackScreenProps<FriendStackParamList | ActivityStackParamList, 'TransactionDetails'>

const icon = {
  color: "#FFFFFF",
  size: 30
}

export default function TransactionDetails(props: TransactionDeatils) {
  const navigation = useNavigation()
  const {transactionId} = props.route.params;
  const transaction: Transaction = Transactions.find(txn => txn.transactionId === transactionId);
  console.log(transaction);
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

  const getUserName = (transactionUserId: string) => {
    const user = getUsersApiCallData.find((user) => user.userId === transactionUserId);
    return user ? user.fullName : 'Unknown'; // Assuming userName is the property you want to display
  };
  
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon 
            icon={faFileInvoiceDollar} 
            size={100}
            color={appStyles.darkFontColor.color}
            />
        </View>
        <View>
          <View>
            <Text style={styles.detailContainerTxt}>Transcation ID:</Text>
            <Text>{transaction.transactionId}</Text>
          </View>
          <View>
            <Text style={styles.detailContainerTxt}>Paid By:</Text>
            <Text>{getUserName(transaction.paidBy)}</Text>
          </View>
          <View>
            <Text style={styles.detailContainerTxt}>Transaction Date:</Text>
            <Text>{getTime(transaction.timestamp)}</Text>
          </View>
          <View>
            <Text style={styles.detailContainerTxt}>Total Amount:</Text>
            <Text>₹ {transaction.totalAmount.toFixed(2)}</Text>
          </View>
          <View>
            <Text style={styles.detailContainerTxt}>Description:</Text>
            <Text>{transaction.description}</Text>
          </View>
        </View>
      </View>
      <FlatList
          data={transactionDetails}
          keyExtractor={item=> item[0]}
          renderItem={({ item }) => (
            <View style={styles.detailsContainer}>
              <View style={styles.userContainer}>
                  <View style={styles.iconContainer}>
                      <FontAwesomeIcon icon={faUser} color={icon.color} size={icon.size} />
                  </View>
                  <View style={styles.userNameContainer}>
                    <Text style={[appStyles.darkFontColor,styles.userNameTxt]}>{getUserName(item[0])}</Text>
                  </View>
              </View>
              <View style={styles.rightContainer}>
                <Text style={[appStyles.negativeTxt]}>₹ {item[1].amount.toFixed(2)}</Text>
                <Text style={[appStyles.negativeTxt]}>{item[1].status}</Text> 
              </View>
          </View>
          )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer:{

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 50,
    paddingVertical: 20,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 30,
    backgroundColor: "#2C3335"
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    marginTop: 20,
    fontSize: 40,
    fontWeight: 'bold'
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 0.25,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 20,
  },
  detailContainerTxt: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userNameContainer: {
    marginStart: 20
  },
  userNameTxt: {
    fontSize:20,
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
},
})