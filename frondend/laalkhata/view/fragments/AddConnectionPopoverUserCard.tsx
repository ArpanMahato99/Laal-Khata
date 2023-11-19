import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAdd, faUser, faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons'
import { styles as appStyles } from '../../styles'

const icon = {
  color: "#FFFFFF",
  size: 30
}

export default function AddConnectionPopoverUserCard() {
  return (
    <View style={styles.cardContainer}>
        <View style={styles.userContainer}>
            <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={faUser} color={icon.color} size={icon.size} />
            </View>
            <View style={styles.userNameContainer}>
                <Text style={[appStyles.darkFontColor,styles.userNameTxt]}>
                    UserName
                </Text>
                <Text style={[appStyles.darkFontColor,styles.miniTxt]}>E: test@mail.com</Text>
                <Text style={[appStyles.darkFontColor,styles.miniTxt]}>M: 1234567890</Text>
            </View>
        </View>
        <TouchableOpacity
            style={[appStyles.btn, appStyles.btnGreen, styles.btn]}
            onPress={() => console.log("SEND ADD")}
          >
            <FontAwesomeIcon icon={faAdd} size={30} style={styles.btnIcon}/>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 10,
      backgroundColor: "#2C3335",
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
  btn: {
      marginRight: 10,
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
      width: '20%'
  },
  btnIcon: {
    color: "#fff"
  },
  miniTxt: {
    fontSize: 14
},
})