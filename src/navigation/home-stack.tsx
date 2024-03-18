import * as React from 'react'

import { Button, View } from 'react-native'

import { CustomDrawer } from './CustomSideDrawer'
import { HomeStackParamList } from '@navigation'
import { ROUTES } from '@constants'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DashboardScreen } from '@containers/Dashboard-screen'
import { Colors } from '@styles'
import { AddFirScreen } from '@containers/add-fir-screen'
import { HistoryScreen } from '@containers/fir-history-screen'
import { AboutScreen, AdminScreen } from '@containers/Admin-screen'
import { SettingsScreen } from '@containers/setting-screen'
import { ContectScreen } from '@containers/contact-screen'
import { GetallUserScreen } from '@containers/get-all-user-screen'
import { UpdateUserDetailsScreen } from '@containers/update-user-details-screen'

type HomeStackProps = {
  onPress?: () => void
}

const Drawer = createDrawerNavigator<HomeStackParamList>()

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.WHITE,
          width: '80%',
          borderBottomRightRadius: 25,
          borderTopRightRadius: 25,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      drawerStyle={{
        width: '100%',
        backgroundColor: 'white',
      }}>
      <Drawer.Screen
        name={ROUTES.DASHBOARD_SCREEN}
        component={DashboardScreen}
        options={{
          headerStyle: {
            backgroundColor: '#ef8c45',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name={ROUTES.ADD_FIR_SCREEN}
        component={AddFirScreen}
        options={{
          headerTitle: 'Add FIR',

          headerStyle: {
            backgroundColor: '#ef8c45',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name={ROUTES.FIR_HISTORY_SCREEN}
        component={HistoryScreen}
        options={{
          headerTitle: 'FIR History',
          headerStyle: {
            backgroundColor: '#ef8c45',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name={ROUTES.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          headerTitle: 'Settings',
          headerStyle: {
            backgroundColor: '#ef8c45',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name={ROUTES.ADMIN_SCREEN}
        component={AdminScreen}
        options={{
          headerTitle: 'Admin',
          headerStyle: {
            backgroundColor: '#ef8c45',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name={ROUTES.CONTECT_SCREEN}
        component={ContectScreen}
        options={{
          headerTitle: 'Contact',
          headerStyle: {
            backgroundColor: '#ef8c45',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name={ROUTES.GET_ALL_USER}
        component={GetallUserScreen}
        options={{
          headerTitle: 'User Complaints',
          headerStyle: {
            backgroundColor: '#ef8c45',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name={ROUTES.UPDATE_USER}
        component={UpdateUserDetailsScreen}
        options={{
          headerTitle: 'Update Complaints',
          headerStyle: {
            backgroundColor: '#ef8c45',
          },
          headerTintColor: 'white',
        }}
      />
    </Drawer.Navigator>
  )
}
