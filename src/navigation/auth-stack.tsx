import * as React from 'react'
import { ROUTES } from '@constants'
import { AuthStackParamList } from './stack-param-list'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { OtpScreen, SignInScreen, SignUpScreen } from '@containers'

const Stack = createNativeStackNavigator<AuthStackParamList>()
type AuthStackProps = {
  onPress?: () => void
}

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.SIGN_IN_SCREEN}
        component={SignInScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.SIGN_UP_SCREEN}
        component={SignUpScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.OTP_SCREEN}
        component={OtpScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}
