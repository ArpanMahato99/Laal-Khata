import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles as appStyles } from '../styles'
import LoginFragment from './fragments/LoginFragment'
import SignupFragment from './fragments/SignupFragment'

export default function LoginScreen() {
    const [toggleLogin, setToggleLogin] = useState(true);

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
        <View>
        <View style={styles.appTitleContainer}>
            <Text style={[appStyles.darkFontColor, styles.title]}>LAAL</Text>
            <Text style={[appStyles.darkFontColor, styles.title]}>KHATA</Text>
        </View>
        { toggleLogin ? (
                <LoginFragment />
            ) : (
                <SignupFragment />
            )
        }
        <View style={styles.toggleContainer}>
            {!toggleLogin ? 
            (
                <Pressable onPress={() => setToggleLogin(!toggleLogin)}>
                    <Text style={[appStyles.darkFontColor, appStyles.linkText]}>Already have an account? Login</Text>
                </Pressable>
            ) : (
                <Pressable onPress={() => setToggleLogin(!toggleLogin)}>
                    <Text style={[appStyles.darkFontColor, appStyles.linkText]}>Create new account</Text>
                </Pressable>
            )}
        </View>
        </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    appTitleContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 50 
    },
    title: {
        fontSize: 80,
        fontWeight: 'bold',
        color: 'red'
    },
    toggleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    
})
