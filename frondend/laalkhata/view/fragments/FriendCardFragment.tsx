import { Button, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import type { PropsWithChildren } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {styles as appStyles} from '../../styles'

type FriendCardProps = PropsWithChildren<Connection>;

const icon = {
    color: "#FFFFFF",
    size: 30
}
const currentUser: User = {
    userId: "6547d449b51c515e9e34c728",
    fullName: "Arpan Mahato",
    email: "test@abc.com",
    phoneNumber: "8797021466",
    upiId: "text@sbi.com"
  } 


export default function FriendCardFragment(connection: FriendCardProps): JSX.Element {
  return (
    <View style={styles.cardContainer}>
        <View style={styles.userContainer}>
            <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={faUser} color={icon.color} size={icon.size} />
            </View>
            <View style={styles.userNameContainer}>
                <Text style={[appStyles.darkFontColor,styles.userNameTxt]}>
                    {   connection.user2.userId !== currentUser.userId ?
                        connection.user2.fullName : connection.user1.fullName
                    }
                </Text>
            </View>
        </View>
        <View style={styles.rightContainer}>
            {
                connection.status === 'APPROVED' && (
                    <View>
                        <Text style={[appStyles.negativeTxt, styles.miniTxt]}>you owe</Text>
                        <Text style={[appStyles.negativeTxt]}>₹10.20</Text>
                    </View>
                )
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 5,
        justifyContent: 'space-between',
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
    miniTxt: {
        fontSize: 14
    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    btn: {
        marginRight: 10
    }
})