import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions} from 'react-native'
import React, { useState } from 'react'
import {NativeStackScreenProps, NativeStackNavigationProp} from '@react-navigation/native-stack'
import { FriendStackParamList } from '../navigators/FriendsStackNavigation'
import { useNavigation } from '@react-navigation/native'
import {styles as appStyles} from '../../styles';
import { Transactions } from '../../data/Transactions'
import TransactionCardFragment from '../fragments/TransactionCardFragment'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faUser, faBell, faMoneyCheckDollar, faSquarePlus, faUserPlus, faUserXmark, faSearch, faFileInvoiceDollar, faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'
import { connections } from '../../data/Connections'
import Popover from 'react-native-popover-view/dist/Popover'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'


type FriendsTransactionProps = NativeStackScreenProps<FriendStackParamList, 'FriendsTransaction'>

export default function FriendsTransaction(props: FriendsTransactionProps) {

  const [isSettleUpVisible, setIsSettleUpVisible] = useState(false);

  const {connectionId}: Connection = props.route.params;
  const connection: Connection = connections.find(connection => connection.connectionId === connectionId);
  
  const icon = {
    color: "#FFFFFF",
    size: 40
  }
  const currentUser: User = {
    userId: "6547d449b51c515e9e34c728",
    fullName: "Arpan Mahato",
    email: "test@abc.com",
    phoneNumber: "8797021466",
    upiId: "text@sbi.com"
  } 
  const navigation = useNavigation<NativeStackNavigationProp<FriendStackParamList>>();
  const userTransactions: Transaction[] = 
      Transactions.filter(transaction => 
          (transaction.transactionDetails[connection.user1.userId] 
          || transaction.transactionDetails[connection.user2.userId])
        );

  const SettleUpPopover = () => {
    return(
      <Popover
        isVisible={isSettleUpVisible}
        popoverStyle={styles.popover}
        backgroundStyle={{opacity: 0.7}}
        
      >
        <TouchableOpacity style={[appStyles.btn, styles.popoverCloseBtn]} onPress={() => setIsSettleUpVisible(false)}>
          <FontAwesomeIcon 
            icon={faCircleXmark}
            color={appStyles.negativeTxt.color}
            size={25}
          />
        </TouchableOpacity>
        <View>
          <Text style={[appStyles.darkFontColor]}>Record payment as cash</Text>
          <Text style={[appStyles.darkFontColor]}>This feature does not move money.</Text>
        </View>
      </Popover>
    )
  }

  return (
    <View style={styles.container}>
      <SettleUpPopover />
      <View style={styles.headerContainer}> 
        <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faUser} color={icon.color} size={icon.size} />
        </View>
        <View style={styles.userContainer}>
            <Text style={[appStyles.darkFontColor,styles.userNameTxt]}>{connection.user2.fullName}</Text>
            {
              connection.status === 'APPROVED' &&
              (<Text style={[styles.secondaryText, appStyles.negativeTxt]}> you owe ₹10.20 to {connection.user2.fullName}</Text>)
            }
        </View>
      </View>
      {
        connection.status === 'APPROVED' && (
          <View>
            <View >
              <Text style={[appStyles.darkFontColor, styles.activityHeaderTxt]}>ACTIVITIES</Text>
              <FlatList
                style={styles.flatList}
                data={userTransactions}
                keyExtractor={item => item.transactionId}
                scrollEnabled={true}
                renderItem={({item}) => (
                  < TouchableOpacity
                    onPress={() => {
                      navigation.navigate('TransactionDetails', {transactionId: item.transactionId})}}
                  >
                    <TransactionCardFragment {...item}/>
                  </TouchableOpacity>
                )}
              />
            </View>
                <View>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={[appStyles.btn, appStyles.btnYellow, styles.btn, styles.btnReminder]}
                      onPress={() => console.log("SEND REMINDER PRESSED")}
                    >
                      <FontAwesomeIcon icon={faBell} size={20} style={styles.btnIcon}/>
                      <Text style={[appStyles.darkFontColor, styles.btnText]}>Send Reminder</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.btnRowContainer}>
                      <TouchableOpacity
                        style={[appStyles.btn, appStyles.btnBlue, styles.btn, styles.btnSettleUp]}
                        onPress={() => setIsSettleUpVisible(true)}
                      >
                        <FontAwesomeIcon icon={faMoneyCheckDollar} size={20} style={styles.btnIcon}/>
                        <Text style={[appStyles.darkFontColor, styles.btnText]}>Settle Up</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[appStyles.btn, appStyles.btnGreen, styles.btn, styles.btnAdd]}
                        onPress={() => {
                          navigation.navigate('AddExpense', {connectionId: connectionId})}}
                      >
                        <FontAwesomeIcon icon={faSquarePlus} size={20} style={styles.btnIcon}/>
                        <Text style={[appStyles.darkFontColor, styles.btnText]}>Add Expense</Text>
                      </TouchableOpacity>
                  </View>
                </View>
          </View>
        )
      }
      {
        connection.status === 'AWAITING' && (
          <View>
            <View style={styles.awaitingBody}>
              {
                connection.user2.userId === currentUser.userId ? (
                  <View>
                    <View style={styles.awaitingBodyTxtContainer}>
                      <Text>{connection.user1.fullName} has sent you a connection request to initiate a transaction.</Text>
                      <Text>Accepting this request will allow both parties to securely share transaction details and split expenses. Do you want to accept the connection request?</Text>
                    </View>
                    <TouchableOpacity
                      style={[appStyles.btn, appStyles.btnGreen, styles.btn]}
                      onPress={() => console.log("SEND ADD")}
                    >
                      <FontAwesomeIcon icon={faUserPlus} size={20} style={styles.btnIcon}/>
                      <Text style={[appStyles.darkFontColor, styles.btnText]}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[appStyles.btn, appStyles.btnRed, styles.btn]}
                      onPress={() => console.log("SEND SETTLE UP")}
                    >
                      <FontAwesomeIcon icon={faUserXmark} size={20} style={styles.btnIcon}/>
                      <Text style={[appStyles.darkFontColor, styles.btnText]}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <View style={styles.awaitingBodyTxtContainer}>
                      <Text style={appStyles.darkFontColor}>You've sent a connection request to {connection.user2.fullName}.</Text>
                      <Text style={appStyles.darkFontColor}>Once they accept, you'll be able to initiate transactions and split expenses seamlessly. Sit tight, and we'll notify you once they respond!</Text>
                    </View>
                    <TouchableOpacity
                      style={[appStyles.btn, appStyles.btnRed, styles.btn]}
                      onPress={() => console.log("SEND SETTLE UP")}
                    >
                      <FontAwesomeIcon icon={faUserXmark} size={20} style={styles.btnIcon}/>
                      <Text style={[appStyles.darkFontColor, styles.btnText]}>Cancel Request</Text>
                    </TouchableOpacity>
                  </View>
                ) 
              }
            </View>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,

  },
  headerContainer: {
    flexDirection: 'row',
    borderBottomColor: '#fff',
    borderBottomWidth: 0.25,

  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#2C3335',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20

  },
  userNameTxt: {
    fontSize:30,
  },
  secondaryText: {
    fontSize: 15
  },
  activityHeaderTxt: {
    fontSize: 20,
    marginTop: 20
  },
  flatList: {
    height: Dimensions.get('screen').height * 0.55, 
    marginBottom: 10,
  },
  btnRowContainer: {
    flexDirection: 'row',
  },
  btnContainer: {
    alignItems: 'stretch'
  },
  btn: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 5
  },
  btnText: {
    fontSize: 16,
  },
  btnReminder: {
    backgroundColor: "#F3B431"
  },
  btnSettleUp: {
    width: '48%',
  },
  btnAdd: {
    width: '48%',
  },
  btnReject: {
    width: '48%',
  },
  btnIcon: {
    marginRight: 10,
    color: "#fff"
  },
  awaitingBody: {
    height: "90%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  awaitingBodyTxtContainer: {
    marginLeft: 10, 
    marginBottom: 20
  },
  popover: {
    backgroundColor: "#000",
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.3,
  },
  popoverCloseBtn: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10
  }
})