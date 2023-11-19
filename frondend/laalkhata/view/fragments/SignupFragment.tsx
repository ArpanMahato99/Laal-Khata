import { Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react';
import {FontAwesomeIcon}  from '@fortawesome/react-native-fontawesome';
import {faUser, faPhone, faEnvelopeOpen, faEnvelope, faUnlock} from '@fortawesome/free-solid-svg-icons'
import {faGooglePay} from '@fortawesome/free-brands-svg-icons'
import {styles as appStyles} from '../../styles';
import {Formik} from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupFragment() {
  const initValues = {
    fullName: '',
    phone: '',
    email: '',
    password: '',
    upiId: ''
  }

  const signUpUser = async (values) => {
    const data = {
      userId: "6547d449b51c515e9e34c728",
      fullName: "Arpan Mahato",
      email: "test@abc.com",
      phoneNumber: "8797021466",
      upiId: "text@sbi.com"
    } 
    await AsyncStorage.setItem("userData", JSON.stringify(data));
    await AsyncStorage.setItem("isUserSignedIn", JSON.stringify(true));
  }

  return (
        <View style={[appStyles.container]}>
          <Formik
            initialValues={initValues}
            onSubmit={values => signUpUser(values)}
          >
            {({handleChange, handleSubmit, values}) => (
              <View>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                      <FontAwesomeIcon
                        icon={faUser}
                        color={appStyles.textInputPlaceholder.color}
                        size={20}
                      />
                  </View>
                  <TextInput
                    style={[styles.inputStyle]}
                    placeholder='Full Name'
                    placeholderTextColor={appStyles.textInputPlaceholder.color} 
                    onChangeText={handleChange('fullName')}
                    value={values.fullName}     
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                      <FontAwesomeIcon 
                        icon={faPhone}
                        color={appStyles.textInputPlaceholder.color}
                        size={20}
                      />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder='Phone Number'
                    placeholderTextColor={appStyles.textInputPlaceholder.color}  
                    keyboardType='numeric'
                    onChangeText={handleChange('phone')}
                    value={values.phone}        
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                      <FontAwesomeIcon 
                        icon={faEnvelope}
                        color={appStyles.textInputPlaceholder.color}
                        size={20}
                      />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder='Email'
                    placeholderTextColor={appStyles.textInputPlaceholder.color}    
                    onChangeText={handleChange('email')}
                    value={values.email}        
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                      <FontAwesomeIcon 
                        icon={faUnlock}
                        color={appStyles.textInputPlaceholder.color}
                        size={20}
                      />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder='Password'
                    secureTextEntry={true}
                    placeholderTextColor={appStyles.textInputPlaceholder.color}   
                    onChangeText={handleChange('password')}
                    value={values.password}         
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                      <FontAwesomeIcon
                        icon={faGooglePay}
                        color={appStyles.textInputPlaceholder.color}
                        size={30}
                      />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder='UPI ID'
                    placeholderTextColor={appStyles.textInputPlaceholder.color}      
                    onChangeText={handleChange('upiId')}
                    value={values.upiId}      
                  />
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={[appStyles.btn, styles.btn]}
                    onPress={handleSubmit}
                  >
                    <Text style={[appStyles.darkFontColor, styles.btnText]}>Signup</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
      iconContainer: {
        backgroundColor: '#2C3335',
        height: 40,
        width: 30,
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
        backgroundColor: '#2C3335',
        width: '80%',
        height: 40,
        padding: 8,
        borderRadius: 10,
        marginHorizontal: 8,
      },
      btnContainer: {
        alignItems: 'center'
      },
      btn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width * 0.50,
        backgroundColor: '#218F76',
      },
      btnText: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      
    
    })