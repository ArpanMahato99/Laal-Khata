import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { PropsWithChildren } from 'react'
import { getTime } from '../../formatter';
import { connections } from '../../data/Connections';
import { styles as appStyles } from '../../styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons'

type ActivityProps = PropsWithChildren<Transaction>


const color = {
  negative: "#FF362E",
  positive: "#2ecc72"
}

const currentUser: User = {
  userId: "6547d449b51c515e9e34c728",
  fullName: "Arpan Mahato",
  email: "test@abc.com",
  phoneNumber: "8797021466",
  upiId: "text@sbi.com"
} 

export default function ActivityCardFragment(transaction: ActivityProps) {
  const {paidBy, timestamp, transactionDetails, description } = transaction;

  const  getAmount = () => {
    
    if(currentUser.userId === paidBy) {
      const userIds = Object.keys(transactionDetails);
      let sumAmount = 0.0;
      userIds.forEach(userId => {
        if (userId !== currentUser.userId) {
          sumAmount += transactionDetails[userId].amount;
        }
      })
      return sumAmount.toFixed(2);
    } else {
      return transactionDetails[currentUser.userId].amount.toFixed(2);
    }
  } 

  const getPaidByUserName = (): string => {
    if (currentUser.userId === paidBy) {
      return "You"
    }
    const connectionIndex = connections.findIndex(connection => connection.user1.userId === paidBy || connection.user2.userId);
    if (connectionIndex !== -1) {
      return connections[connectionIndex].user1.userId === paidBy ? 
              connections[connectionIndex].user1.fullName : 
              connections[connectionIndex].user2.fullName; 
    } else {
      return "User";
    }
  }
  
  return (
    <View style={styles.activityContainer}>
      <View style={styles.iconContainer}>
          <FontAwesomeIcon 
            icon={faMoneyBillTransfer} 
            color={currentUser.userId===paidBy ? appStyles.positiveTxt.color : appStyles.negativeTxt.color} 
            size={30}
          />    
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentHeader}>
          { getPaidByUserName() } added {description}
        </Text>
        <Text style={[styles.amount, {color:currentUser.userId===paidBy ? appStyles.positiveTxt.color : appStyles.negativeTxt.color}]}>
          { currentUser.userId===paidBy ? 'You get back': 'You owe'} ₹{getAmount()}
        </Text>
        <Text style={styles.date}>{getTime(timestamp)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#2C3335"
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#2C3335',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 0.25,
    margin: 10
  },
  contentContainer: {
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  contentHeader: {
    fontSize: 18,
  },
  amount: {
    fontSize: 16,
  },
  date: {
    fontSize: 13
  }
})