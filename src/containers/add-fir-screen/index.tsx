import {
  SafeAreaView,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'

import { HomeStackNavProps } from '@navigation'
import React, { useEffect, useState } from 'react'
import { Images, ROUTES } from '@constants'
import { Auth } from 'aws-amplify'
import axios from 'axios'
import { styled } from 'nativewind'
import { ButtonComponent, LabelComponent } from '@components'
import { Colors } from '@styles'
import Lottie from 'lottie-react-native'
import { useFocusEffect } from '@react-navigation/native'

const StyledView = styled(View)
const StyledLabel = styled(LabelComponent)
const StyledTextInput = styled(TextInput)
const StyledTouchable = styled(ButtonComponent)
const StyledSafe = styled(SafeAreaView)
const StyledKeyboardavoid = styled(KeyboardAvoidingView)

export const AddFirScreen: React.FC<HomeStackNavProps<'AddFirScreen'>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [firid, setFirid] = useState('')
  const [fircontent, setFircontent] = useState('')

  const [mobileNo, setMobileNo] = useState('')
  const [hide, setHide] = useState(false)
  const [buttonshow, setButtonshow] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      setHide(false)
      setButtonshow(false)
      setFname('')
      setEmail('')
      setFirid('')
      setLname('')
      setMobileNo('')
      setFircontent('')
    }, [])
  )

  const handleSubmit = async () => {
    const attributes = await Auth.currentUserInfo()

    try {
      setButtonshow(true)
      const body = JSON.stringify({
        user_id: attributes?.id,
        fir_id: firid,
        fir_content: fircontent,
        first_name: fname,
        last_name: lname,
        mobile_no: parseInt(mobileNo, 10),
        email_id: email,
      })
      console.log(body, 'klmlm')

      const response = await axios.post('http://localhost:3000/user/create', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      navigation.navigate(ROUTES.HOME_STACK, { screen: ROUTES.Da })
      console.log(response.data, 'sassa')
      setHide(!hide)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <StyledSafe className={'flex-1'}>
      {!hide && (
        <StyledView>
          <StyledView className={'mt-8 mx-7 items-center'}>
            <StyledLabel title={'FIR FORM'} className={'text-3xl font-extrabold'} />
            <StyledLabel
              title={'Please Fill Your FIR Form'}
              className={'text-lg font-medium mt-1'}
            />
          </StyledView>
          <ScrollView scrollEnabled={false}>
            <StyledKeyboardavoid className={'flex-1'} behavior={'padding'}>
              <StyledView className={'py-4'}>
                <StyledTextInput
                  value={firid}
                  placeholder={'FIR Form No'}
                  placeholderTextColor={Colors.GRAY_DARK}
                  onChangeText={text => setFirid(text)}
                  className={
                    ' border-b-[1px] border-gray-400 p-4 w-[85%] self-center mt-2 text-black'
                  }
                />
                <StyledTextInput
                  value={fircontent}
                  placeholder={'FIR Content'}
                  placeholderTextColor={Colors.GRAY_DARK}
                  onChangeText={text => setFircontent(text)}
                  className={
                    ' border-b-[1px] border-gray-400 p-4 w-[85%] self-center mt-2 text-black'
                  }
                  numberOfLines={2}
                />
                <StyledTextInput
                  value={fname}
                  placeholder={'Frist Name'}
                  placeholderTextColor={Colors.GRAY_DARK}
                  onChangeText={text => setFname(text)}
                  className={
                    ' border-b-[1px] border-gray-400 p-4 w-[85%] self-center mt-2 text-black'
                  }
                />
                <StyledTextInput
                  value={lname}
                  placeholder={'Last Name'}
                  placeholderTextColor={Colors.GRAY_DARK}
                  onChangeText={text => setLname(text)}
                  className={
                    ' border-b-[1px] border-gray-400 p-4 w-[85%] self-center mt-2 text-black'
                  }
                />
                <StyledTextInput
                  value={mobileNo}
                  placeholder={'Mobile No'}
                  placeholderTextColor={Colors.GRAY_DARK}
                  onChangeText={text => setMobileNo(text)}
                  keyboardType={'number-pad'}
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
              </StyledView>
              {!buttonshow ? (
                <StyledTouchable
                  className={`${
                    firid === '' ||
                    fircontent === '' ||
                    fname === '' ||
                    lname === '' ||
                    mobileNo === '' ||
                    email === ''
                      ? 'bg-gray-300 opacity-70'
                      : 'bg-[#ef8c45]'
                  } py-3 my-5 mx-7 rounded-xl`}
                  disabled={
                    firid === '' ||
                    fircontent === '' ||
                    fname === '' ||
                    lname === '' ||
                    mobileNo === '' ||
                    email === ''
                  }
                  onpress={handleSubmit}>
                  <StyledLabel
                    title={'File FIR'}
                    className={'text-2xl text-black font-bold text-center relative'}
                  />
                </StyledTouchable>
              ) : (
                <StyledTouchable
                  className={' items-center  rounded-xl'}
                  onpress={handleSubmit}>
                  <Lottie
                    source={require('../../assets/imgs/84619-submitting-loading-button.json')}
                    autoPlay={true}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      justifyContent: 'center',
                      height: 85,
                    }}
                  />
                </StyledTouchable>
              )}
            </StyledKeyboardavoid>
          </ScrollView>
        </StyledView>
      )}
      {hide && (
        <StyledView className={'justify-center'}>
          <Lottie
            source={require('../../assets/imgs/137999-success.json')}
            autoPlay
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              justifyContent: 'center',
              height: '78%',
            }}
          />
          <StyledLabel
            title={'FIR ADDED'}
            className={'text-2xl text-orange-400 font-bold text-center'}
          />
          <StyledLabel
            title={'SUCCESFULLY ON PORTAL'}
            className={'text-2xl text-orange-400 font-bold text-center'}
          />
        </StyledView>
      )}
    </StyledSafe>
  )
}
