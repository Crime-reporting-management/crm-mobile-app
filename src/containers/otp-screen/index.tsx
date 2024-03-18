import React, { useState } from 'react'
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native'
import { Images, ROUTES } from '@constants'
import { AuthStackNavProps } from '@navigation'
import {
  ButtonComponent,
  ButtonVariant,
  ImageComponent,
  LabelComponent,
  TextVarient,
} from '@components'
import { styled } from 'nativewind'
import { Colors } from '@styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Auth } from 'aws-amplify'

const StyledView = styled(View)
const StyledLabel = styled(LabelComponent)
const StyledTextInput = styled(TextInput)
const StyledTouchable = styled(ButtonComponent)

export const OtpScreen: React.FC<AuthStackNavProps<'OtpScreen'>> = ({
  navigation,
  route,
}) => {
  const [otp, setOtp] = useState('')

  const { email } = route.params

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, otp)
      navigation.push(ROUTES.HOME_STACK, {
        screen: ROUTES.DASHBOARD_SCREEN,
      })
    } catch (error) {
      Alert.alert('', error.message)
    }
  }

  return (
    <StyledView>
      <StyledView className={'border-b-4 rounded-b-3xl   border-black'}>
        <ImageComponent className={'w-full h-64  mt-2 '} source={Images.logo} />
      </StyledView>
      <StyledView>
        <StyledView className={'mx-7 mt-6 mb-2'}>
          <StyledLabel
            title={'Confirmation Code'}
            className={'text-[25px] font-bold text-black'}
          />
          <StyledLabel
            title={`Enter the verification code that was sent to\nyour inbox`}
            className={'text-[16px] text-black  '}
          />
        </StyledView>
        <StyledTextInput
          value={otp}
          placeholder={'Confirm Password'}
          placeholderTextColor={Colors.BLACK}
          onChangeText={text => setOtp(text)}
          keyboardType='number-pad'
          className={' border-b-2 w-[85%] self-center mt-2'}
        />
      </StyledView>
      <StyledTouchable
        onpress={confirmSignUp}
        className={'bg-gray-300 py-3 my-5 mx-7 rounded-xl '}>
        <StyledLabel
          className={'text-center font-medium text-lg text-gray-800'}
          title={'Confirm'}
        />
      </StyledTouchable>
    </StyledView>
  )
}
