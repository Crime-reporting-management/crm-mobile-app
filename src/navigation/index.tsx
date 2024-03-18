import { LogBox, Text } from 'react-native'

import { AuthStack } from '@navigation'
import { HomeStack } from './home-stack'
import { NavigationContainer } from '@react-navigation/native'
import { ROUTES } from '@constants'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from '@navigation'
import { Auth } from 'aws-amplify'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator()

export const AppNavigator = ({ id }: { id: string | null }) => {
  LogBox.ignoreLogs(['Warning: ...', 'Warning: Failed', 'Warning: Each']) // Ignore log notification by message
  LogBox.ignoreAllLogs() //Ignore all log notifications
  const routeNameRef = React.useRef()
  console.log(id, 'iddd')
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name
      }}
      fallback={<Text>Loading...</Text>}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {id ? (
          <>
            <Stack.Screen name={ROUTES.HOME_STACK} component={HomeStack} />
            <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />
          </>
        ) : (
          <>
            <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />
            <Stack.Screen name={ROUTES.HOME_STACK} component={HomeStack} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export * from './stack-param-list'
export * from './auth-stack'
export * from './home-stack'
export * from './NavigationService'
export * from './CustomSideDrawer'
