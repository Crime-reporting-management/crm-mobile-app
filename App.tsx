import 'react-native-gesture-handler'

import { AppNavigator } from '@navigation'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import awsconfig from './src/aws-exports'
import { Amplify, Auth } from 'aws-amplify'

Amplify.configure(awsconfig)
const App = () => {
  const [id, setId] = useState('')
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const attributes = await Auth.currentUserInfo()
    console.log(attributes?.id)
    setId(attributes?.id)
  }
  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}>
      <AppNavigator id={id} />
    </SafeAreaProvider>
  )
}

export default App
