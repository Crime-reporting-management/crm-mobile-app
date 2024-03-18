import React, { useState } from 'react'
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native'
import { Images, ROUTES } from '@constants'
import { AuthStackNavProps } from '@navigation'
import { ButtonComponent, ImageComponent, LabelComponent } from '@components'
import { styled } from 'nativewind'
import { Colors } from '@styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Auth } from 'aws-amplify'

const StyledView = styled(SafeAreaView)
const StyledLabel = styled(LabelComponent)
const StyledTextInput = styled(TextInput)
const StyledTouchable = styled(ButtonComponent)
const StyledKeyboardavoid = styled(KeyboardAvoidingView)

export const SignInScreen: React.FC<AuthStackNavProps<'SignInScreen'>> = ({
  navigation,
}) => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)

  const [hidePassword, setHidePassword] = useState(true)

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword)
  }

  const signIn = async () => {
    try {
      console.log(email, password, 'userrrx')
      await Auth.signIn(email, password)
      navigation.navigate(ROUTES.HOME_STACK, { screen: ROUTES.DASHBOARD_SCREEN })
    } catch (error) {
      console.log('error signing in', error)
      Alert.alert('', error.message)
    }
  }
  const isemailValid = email => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  return (
    <StyledView className={'flex-1'}>
      <StyledView>
        <StyledView className={''}>
          <ImageComponent
            className={'w-full h-64  mt-2 '}
            resizeMode="contain"
            source={Images.logo}
          />
        </StyledView>
        <StyledView>
          <StyledView className={'mx-7 my-6 items-center'}>
            <StyledLabel
              title={'Welcome to Crime Buster'}
              className={'text-[25px] font-bold text-black mb-4'}
            />
            {/* <StyledLabel
              title={'Enter your credentials to continue'}
              className={'text-[16px] text-black  '}
            /> */}
          </StyledView>
          <ScrollView scrollEnabled={false}>
            <StyledKeyboardavoid className={'flex-1'} behavior="padding">
              <StyledView>
                <StyledTextInput
                  value={email}
                  placeholder={'Email ID'}
                  placeholderTextColor={Colors.GRAY_DARK}
                  onChangeText={text => {
                    setEmail(text)
                    setIsEmailValid(isemailValid(text))
                  }}
                  className={
                    ' border-b-[1px] border-gray-400 p-4 w-[85%] self-center mt-2 text-black'
                  }
                />
                <StyledTextInput
                  value={password}
                  placeholder={'Password'}
                  placeholderTextColor={Colors.GRAY_DARK}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={hidePassword}
                  className={
                    ' border-b-[1px] border-gray-400 p-4 w-[85%] self-center mt-5 mb-4 text-black'
                  }
                />
                <StyledTouchable
                  onpress={togglePasswordVisibility}
                  className={'absolute bottom-0 right-1 mr-10 mb-7'}>
                  <Icon
                    name={hidePassword ? 'eye-slash' : 'eye'}
                    size={24}
                    color={Colors.BLACK}
                  />
                </StyledTouchable>
              </StyledView>
              <StyledTouchable
                onpress={signIn}
                disabled={!isEmailValid || password === ''}
                className={`${
                  !isEmailValid || password === ''
                    ? 'bg-gray-300 opacity-70'
                    : 'bg-[#ef8c45]'
                } py-3 my-5 mx-7 rounded-xl `}>
                <StyledLabel
                  className={'text-center font-medium text-lg text-gray-800'}
                  title={'Login to your account'}
                />
              </StyledTouchable>
            </StyledKeyboardavoid>
          </ScrollView>
          <StyledLabel title={'&'} className={'text-center text-2xl text-black'} />
          <StyledView>
            <StyledTouchable
              onpress={() =>
                navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.SIGN_UP_SCREEN })
              }>
              <StyledLabel
                title={"Don't have an account?  Register"}
                className={'text-center text-base mt-2 '}
              />
            </StyledTouchable>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  )
}
