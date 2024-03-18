import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

export type AuthStackParamList = {
  SignInScreen: {
    code: string | undefined
    state: string | undefined
  }
  SignUpScreen: {
    code: string | undefined
    state: string | undefined
  }
  OtpScreen: {
    code: string | undefined
    state: string | undefined
  }
  SignUpConfirmScreen: undefined
  CreateUserScreen: undefined
}

export type AuthStackNavProps<T extends keyof AuthStackParamList> = {
  navigation: NativeStackNavigationProp<AuthStackParamList, T>
  route: RouteProp<AuthStackParamList, T>
}

export type HomeStackNavProps<T extends keyof HomeStackParamList> = {
  navigation: NativeStackNavigationProp<HomeStackParamList, T>
  route: RouteProp<HomeStackParamList, T>
}

export type HomeStackParamList = {
  DashboardScreen: undefined
  AddFirScreen: undefined
  HistoryScreen: undefined
  AdminScreen: undefined
  SettingsScreen: undefined
  ContectScreen: undefined
  GetallUserScreen: undefined
  UpdateUserDetailsScreen: undefined
}
