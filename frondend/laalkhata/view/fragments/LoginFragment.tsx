import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {styles as appStyles} from '../../styles';

export default function LoginFragment() {
  return (
    <View style={[appStyles.container]}>
      <View style={styles.inputWrapper}>
        <View style={styles.iconContainer}>
            <FontAwesomeIcon name='phone'/>
        </View>
        <TextInput
          style={styles.inputStyle}
          placeholder='Phone Number'  
          keyboardType='numeric'    
        />
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.iconContainer}>
            <FontAwesomeIcon name='unlock-alt'/>
        </View>
        <TextInput
          style={styles.inputStyle}
          placeholder='Password'      
        />
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={[appStyles.btn, styles.btn]}
          onPress={() => Alert.alert("Login api call")}
        >
          <Text style={[appStyles.darkFontColor, styles.btnText]}>Login</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputStyle: {
    backgroundColor: '#ffffff',
    width: '80%',
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: '#2ecc72',
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold'
  }

})