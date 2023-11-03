import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import {styles as appStyles} from '../../styles'

const icon = {
    color: "#FFFFFF",
    size: 20
}


export default function FriendCardFragment() {
  return (
    <View>
        <View style={styles.cardContainer}>
        <View style={styles.userContainer}>
            <View style={styles.iconContainer}>
                <FontAwesome5Icon name='user-alt' color={icon.color} size={icon.size} />
            </View>
            <View style={styles.userNameContainer}>
                <Text style={[appStyles.darkFontColor,styles.userNameTxt]}>USER 1</Text>
            </View>
        </View>
        <View style={styles.moneyContainer}>
            <Text style={[styles.negativeTxt, styles.miniTxt]}>you owe</Text>
            <Text style={[styles.negativeTxt]}>₹10.20</Text>
        </View>
    </View>
    <View style={styles.cardContainer}>
        <View style={styles.userContainer}>
            <View style={styles.iconContainer}>
                <FontAwesome5Icon name='user-alt' color={icon.color} size={icon.size} />
            </View>
            <View style={styles.userNameContainer}>
                <Text style={[appStyles.darkFontColor,styles.userNameTxt]}>USER 1</Text>
            </View>
        </View>
        <View style={styles.moneyContainer}>
            <Text style={[styles.positiveTxt, styles.miniTxt]}>owes you</Text>
            <Text style={[styles.positiveTxt]}>₹10.20</Text>
        </View>
    </View>
    <View style={styles.cardContainer}>
        <View style={styles.userContainer}>
            <View style={styles.iconContainer}>
                <FontAwesome5Icon name='user-alt' color={icon.color} size={icon.size} />
            </View>
            <View style={styles.userNameContainer}>
                <Text style={[appStyles.darkFontColor,styles.userNameTxt]}>USER 1</Text>
            </View>
        </View>
        <View style={styles.moneyContainer}>
            <Text style={[styles.settledUpTxt]}>settled up</Text>
        </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical:10,
        paddingHorizontal: 5,
        justifyContent: 'space-between'
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#F4C724",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
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
        fontSize: 11
    },
    moneyContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    negativeTxt: {
        color: "#FF362E"
    },
    positiveTxt: {
        color: "#2ecc72"
    },
    settledUpTxt: {
        color: "#DAE0E2",
    }
})