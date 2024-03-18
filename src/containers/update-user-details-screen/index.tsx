import { Alert, SafeAreaView, Text, TextInput, View } from 'react-native'

import { HomeStackNavProps } from '@navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ButtonComponent, LabelComponent } from '@components'
import { styled } from 'nativewind'
import { useFocusEffect } from '@react-navigation/native'
import { Colors } from '@styles'
import { ROUTES } from '@constants'

const StyledView = styled(View)
const StyledLabel = styled(LabelComponent)
const StyledTextInput = styled(TextInput)
const StyledTouchable = styled(ButtonComponent)
const StyledSafe = styled(SafeAreaView)

export const UpdateUserDetailsScreen: React.FC<
  HomeStackNavProps<'UpdateUserDetailsScreen'>
> = ({ route, navigation }) => {
  const [status, setStatus] = useState('')
  const [id, setId] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      setStatus(route?.params?.item?.status)
    }, [])
  )
  const GoalUpdate = async () => {
    try {
      let body = {
        status: status,
      }
      console.log(id, 'sasbasbah')
      console.log(body, 'sasasvdgvsdv')
      const response = await axios.put(
        `http://localhost:3000/user/update/${route?.params?.item?.user_id}`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response?.data, 'sasasas')
      navigation.navigate(ROUTES.HOME_STACK, {
        screen: ROUTES.GET_ALL_USER,
      })
    } catch (error) {
      console.error(error.response.data, 'errrrr')
      Alert.alert(error.response.data)
    }
  }
  return (
    <StyledSafe className="flex-1">
      <StyledView className="flex-1 justify-center">
        <StyledTextInput
          value={status}
          placeholder={'Status'}
          placeholderTextColor={Colors.GRAY_DARK}
          onChangeText={text => setStatus(text)}
          className={
            ' border-b-[1px] border-gray-400 p-4 w-[85%] text-base self-center mt-5 mb-4 text-black'
          }
        />
        <StyledView>
          <StyledTouchable
            className={`${
              status === '' ? 'bg-gray-300 opacity-70' : 'bg-[#ef8c45]'
            } py-3 m-7 rounded-xl`}
            disabled={status === ''}
            onpress={() => GoalUpdate()}>
            <StyledLabel
              title={'Save'}
              className={'text-2xl text-black font-bold text-center relative'}
            />
          </StyledTouchable>
        </StyledView>
      </StyledView>
    </StyledSafe>
  )
}
