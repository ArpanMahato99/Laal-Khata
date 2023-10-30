import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react';
import { Icon } from '@rneui/themed';
import {styles as appStyles} from '../../styles';

export default function SignupFragment() {
  return (
        <View style={[appStyles.container]}>
          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
                <Icon 
                  name='user'
                  type='font-awesome'
                />
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder='Full Name'      
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
                <Icon 
                  name='phone'
                  type='font-awesome'
                />
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder='Phone Number'
              keyboardType='numeric'      
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
                <Icon 
                  name='email'
                  type='font-awesome'
                />
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder='Email'      
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
                <Icon 
                  name='password'
                  type='font-awesome'
                />
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder='Password'      
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
                <Icon 
                  name='upi'
                  type='font-awesome'
                />
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder='UPI ID'      
            />
          </View>
          <View style={styles.btnContainer}>
            <Pressable
              style={[appStyles.btn, styles.btn]}
              onPress={() => Alert.alert("Signup api call")}
            >
              <Text style={[appStyles.darkFontColor, styles.btnText]}>Signup</Text>
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