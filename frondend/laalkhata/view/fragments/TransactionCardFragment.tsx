import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Transactions } from '../../data/Transactions'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { getDate, getMonth } from '../../formatter';
import { connections } from '../../data/Connections';
import { styles as appStyles } from '../../styles';


type TransactionCardProps = PropsWithChildren<Transaction>;

const currentUser: User = {
  userId: "6547d449b51c515e9e34c728",
  fullName: "Arpan Mahato",
  email: "test@abc.com",
  phoneNumber: "8797021466",
  upiId: "text@sbi.com"
} 

export default function TransactionCardFragment(props: TransactionCardProps) {
  
  const {description, paidBy, timestamp, totalAmount, transactionDetails} = props.item;

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
  
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.monthTxt}>{getMonth(timestamp)}</Text>
          <Text style={styles.dateTxt}>{getDate(timestamp)}</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome5Icon 
            name='file-invoice-dollar' 
            color={currentUser.userId===paidBy ? appStyles.positiveTxt.color : appStyles.negativeTxt.color} 
            size={40}
            />
        </View>
        <View style={styles.mainTxtContainer}>
          <Text style={styles.mainTxt}>
            {description}
          </Text>
          <Text>
            {getPaidByUserName()} paid {totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.secondaryTxtContainer}>
        <Text style={{color:currentUser.userId===paidBy ? appStyles.positiveTxt.color : appStyles.negativeTxt.color}}>
          {currentUser.userId === paidBy ?
            'You lent' : 'You borrowed'  
          }
        </Text>
        <Text style={{color:currentUser.userId===paidBy ? appStyles.positiveTxt.color : appStyles.negativeTxt.color}}>₹{getAmount()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#2C3335"
  },
  subcontainer:{
    flexDirection: 'row',
  },
  dateContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  }, 
  monthTxt: {

  },
  dateTxt: {
    fontSize: 20
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
  },
  mainTxtContainer: {
    marginLeft: 20,
  },
  mainTxt: {
    fontSize: 20
  },
  secondaryTxtContainer: {
    alignItems: 'flex-end',
    paddingRight: 20,
  }
})