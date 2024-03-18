import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native'
import { AuthStackNavProps } from '@navigation'
import { styled } from 'nativewind'
import { ButtonComponent, ImageComponent, LabelComponent } from '@components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '@styles'
import { Images, ROUTES } from '@constants'
import { Auth } from 'aws-amplify'

const StyledView = styled(View)
const StyledSafeAreaView = styled(SafeAreaView)
const StyledLabel = styled(LabelComponent)
const StyledTextInput = styled(TextInput)
const StyledTouchable = styled(ButtonComponent)
const StyledKeyboardavoid = styled(KeyboardAvoidingView)

export const SignUpScreen: React.FC<AuthStackNavProps<'SignUpScreen'>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [repassword, setRepassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)
  const [hideRePassword, setHideRePassword] = useState(true)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsValid(userName !== '' && email !== '' && password !== '' && repassword !== '')
  }, [userName, email, password, repassword])

  const signUp = async (name: string, password: string, username: string) => {
    try {
      const { user } = await Auth.signUp({
        name,
        password,
        username,
        attributes: {
          email: username,
          name,
        },
        autoSignIn: {
          enabled: true,
        },
      })
    } catch (error) {
      // console.log('error signing up:', error)
      Alert.alert('', error.message)
    }
  }
  const handleContinuePress = () => {
    if (isValid && password == repassword) {
      signUp(userName, password, email)
      navigation.push(ROUTES.AUTH_STACK, {
        screen: ROUTES.OTP_SCREEN,
        params: { email },
      })
    } else {
      console.log('passwords are not same')
    }
  }
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword)
  }
  const toggleRePasswordVisibility = () => {
    setHideRePassword(!hideRePassword)
  }

  return (
    <StyledSafeAreaView className={'flex-1'}>
      <StyledView className={''}>
        <ImageComponent
          className={'w-full h-64  mt-2 '}
          resizeMode='contain'
          source={Images.logo}
        />
      </StyledView>
      <StyledView>
        <StyledView className={'mx-7 mt-6 mb-2 items-center'}>
          <StyledLabel
            title={'Create Your Account'}
            className={'text-[25px] font-bold text-black'}
          />
        </StyledView>
      </StyledView>
      <ScrollView scrollEnabled={false}>
        <StyledKeyboardavoid className={'flex-1'} behavior='padding'>
          <StyledView>
            <StyledTextInput
              value={userName}
              placeholder={'Username'}
              placeholderTextColor={Colors.GRAY_DARK}
              onChangeText={text => setUserName(text)}
              className={
                ' border-b-[1px] border-gray-400 p-4 w-[85%] self-center mt-2 text-black'
              }
            />
            <StyledTextInput
              value={email}
              placeholder={'Email ID'}
              placeholderTextColor={Colors.GRAY_DARK}
              onChangeText={text => setEmail(text)}
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
                ' border-b-[1px] border-gray-400 p-4 w-[85%] self-center mt-2 text-black'
              }
            />

            <StyledTouchable
              onpress={togglePasswordVisibility}
              className={'absolute bottom-0 right-1 mr-10 mb-4'}>
              <Icon
                name={hidePassword ? 'eye-slash' : 'eye'}
                size={24}
                color={Colors.BLACK}
              />
            </StyledTouchable>
          </StyledView>
          <StyledView>
            <StyledTextInput
              value={repassword}
              placeholder={'Confirm Password'}
              placeholderTextColor={Colors.GRAY_DARK}
              onChangeText={text => setRepassword(text)}
              secureTextEntry={hideRePassword}
              className={
                ' border-b-[1px] border-gray-400 p-4 w-[85%] self-center mt-2 text-black'
              }
            />
            <StyledTouchable
              onpress={toggleRePasswordVisibility}
              className={'absolute bottom-0 right-1 mr-10 mb-4'}>
              <Icon
                name={hideRePassword ? 'eye-slash' : 'eye'}
                size={24}
                color={Colors.BLACK}
              />
            </StyledTouchable>
          </StyledView>
          <StyledTouchable
            onpress={handleContinuePress}
            disabled={
              userName === '' || email === '' || password === '' || repassword === ''
            }
            className={`${
              userName === '' || email === '' || password === '' || repassword === ''
                ? 'bg-gray-300 opacity-70'
                : 'bg-[#ef8c45]'
            } py-3 my-5 mx-7 mt-10 rounded-xl `}>
            <StyledLabel
              className={'text-center font-medium text-lg text-gray-800'}
              title={'Sign Up'}
            />
          </StyledTouchable>
        </StyledKeyboardavoid>
      </ScrollView>
    </StyledSafeAreaView>
  )
}
