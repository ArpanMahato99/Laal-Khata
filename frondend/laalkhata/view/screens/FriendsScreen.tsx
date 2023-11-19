import { StyleSheet, View, FlatList, TouchableOpacity, Text, Dimensions, TextInput, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import FriendCardFragment from '../fragments/FriendCardFragment'
import { connections } from '../../data/Connections'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { FriendStackParamList } from '../navigators/FriendsStackNavigation'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faUserPlus, faSearch} from '@fortawesome/free-solid-svg-icons'
import { styles as appStyles } from '../../styles'
import Popover from 'react-native-popover-view/dist/Popover'
import { Placement } from 'react-native-popover-view/dist/Types'
import AddConnectionPopoverUserCard from '../fragments/AddConnectionPopoverUserCard'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

type FriendProps = NativeStackScreenProps<FriendStackParamList, 'FriendsScreen'>;

export default function FriendsScreen({navigation}: FriendProps) {

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isSearchSuccess, setIsSearchSuccess] = useState(true);


  const AddUserPopover = () => {

    return(
      <Popover
        isVisible={isPopoverVisible}
        popoverStyle={styles.popover}
        placement={Placement.TOP}
        backgroundStyle={{opacity: 0.7}}
        
      >
        <TouchableOpacity style={[appStyles.btn, styles.popoverCloseBtn]} onPress={() => setIsPopoverVisible(false)}>
          <FontAwesomeIcon 
            icon={faCircleXmark}
            color={appStyles.negativeTxt.color}
            size={25}
          />
        </TouchableOpacity>
        <View style={styles.popoverContent}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputStyle}
              placeholder='Search User by Email or Phone Number'
              placeholderTextColor={appStyles.textInputPlaceholder.color}    
              // keyboardType='numeric'  
              // onChangeText={handleChange('phone')}  
              // value={values.phone}
            />
            <TouchableOpacity style={styles.iconContainer}>
                <FontAwesomeIcon 
                  icon={faSearch}
                  color={appStyles.textInputPlaceholder.color}
                  size={25}
                />
            </TouchableOpacity>
          </View>
          {
            isSearchSuccess ? (<AddConnectionPopoverUserCard />) : (<Text>Search user by email or phone number!!!</Text>)
          }
        </View>
      </Popover>
    )
  }

  return (
    <View >
      <AddUserPopover />
      <View style={styles.headerIconContainer}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => setIsPopoverVisible(true)}>
            <FontAwesomeIcon 
                icon={faUserPlus} 
                color={styles.headerIcon.color} 
                size={styles.headerIcon.fontSize}
            />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        data={connections}
        keyExtractor={item => item.connectionId}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FriendsTransaction', {connectionId: item.connectionId})}
          >
            <FriendCardFragment {...item} />
          </TouchableOpacity>
        )}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  headerIconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 50
  },
  headerIcon: {
    marginHorizontal: 15,
    color: '#ffffff',
    fontSize: 25
  }, 
  flatList: {
    height: Dimensions.get('screen').height * 0.95,
    marginBottom: 10,
  },
  popover: {
    backgroundColor: "#000",
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.3,
    borderRadius: 10,
  },
  popoverContent: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: '#2C3335',
    height: 40,
    width: 40,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputStyle: {
    backgroundColor: '#2C3335',
    width: '80%',
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  popoverCloseBtnContainer:{
    alignContent: 'flex-end',
    justifyContent: 'flex-end'
  },
  popoverCloseBtn: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10
  }
   
})
