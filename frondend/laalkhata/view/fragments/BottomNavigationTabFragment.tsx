import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FriendsScreen from '../FriendsScreen';
import ActivityScreen from '../ActivityScreen';
import ProfileScreen from '../ProfileScreen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { styles as appStyles} from '../../styles';

const Tab = createBottomTabNavigator();

export default function BottomNavigationTabFragment() {
  return (
    <Tab.Navigator
        screenOptions={{
            headerStyle: {...styles.headerStyle},
            headerTitleStyle: {...styles.headerTitle},
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#2ecc72",
            tabBarInactiveTintColor: "#DAE0E2",
            tabBarStyle: {...styles.tabBarStyle}
        }}
        sceneContainerStyle={appStyles.darkAppContainer}
        
    >
        <Tab.Screen 
            name="Friends" 
            component={FriendsScreen}
            options={{
                headerRight: ({}) => (
                    <Pressable style={styles.headerIcon}>
                        <FontAwesome5Icon name='user-plus' color={"#FFFFFF"} size={20}/>
                    </Pressable>
                ),
                tabBarIcon: ({color}) => (
                    <View>
                        <FontAwesome5Icon name='user-friends' color={color} size={20}/>
                    </View>
                    
                )
            }} 
        />
        <Tab.Screen 
            name="Activity" 
            component={ActivityScreen}
            options={{
                tabBarIcon: ({color}) => (
                    <View>
                        <FontAwesome5Icon name='exchange-alt' color={color} size={20} />
                    </View>
                )
            }}
        />
        <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
                tabBarIcon: ({color}) => (
                    <View>
                        <FontAwesome5Icon name='user-alt' color={color} size={20} />
                    </View>
                )
            }}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: "#2C3335",
        position: 'absolute',
        elevation: 0,    
        height: 50,
        paddingBottom: 5,
        paddingTop: 5,

    },
    navText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    headerStyle: {
        backgroundColor: "#2C3335",
    },
    headerIcon: {
        marginHorizontal: 10
    },
    headerTitle: {
        
    }
})