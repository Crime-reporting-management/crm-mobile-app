import { Image, SafeAreaView, View } from 'react-native'

import { HomeStackNavProps } from '@navigation'
import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { ButtonComponent, LabelComponent } from '@components'
import { styled } from 'nativewind'
import UserIcon from 'react-native-vector-icons/Entypo'

import { Colors } from '@styles'
import { Images, ROUTES } from '@constants'

const StyledLabel = styled(LabelComponent)
const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledButton = styled(ButtonComponent)

export const SettingsScreen: React.FC<HomeStackNavProps<'SettingsScreen'>> = ({
  navigation,
}) => {
  const [userinfo, setUserinfo] = useState()
  const [name, setName] = useState([])

  useEffect(() => {
    fetchCurrentSessions()
  }, [])

  const fetchCurrentSessions = async () => {
    const userdata = await Auth.currentUserInfo()
    console.log(userdata?.attributes, 'useeee')
    const name = userdata?.attributes?.name.split(' ')
    setName(name)
    setUserinfo(userdata?.attributes)
  }
  return (
    <SafeAreaView>
      <StyledImage source={Images.profile} className={'h-20 w-20 self-center mt-7'} />

      <StyledView className={'mx-3 my-2 px-2 '}>
        <StyledView className={'flex-row items-center mb-5 self-center'}>
          <StyledLabel
            className={'text-2xl font-bold text-black ml-2 '}
            title={name[0]}
          />
          <StyledLabel
            className={'text-2xl font-bold text-black ml-2 '}
            title={name[1]}
          />
        </StyledView>
        <StyledView
          className={'flex-row items-center shadow-md bg-white rounded-full px-10 p-3 '}>
          <StyledImage source={Images.google} className={'h-6 w-6 ml-4 shadow'} />
          <StyledLabel
            className={'text-xl font-bold text-black ml-2 '}
            title={userinfo?.email}
          />
        </StyledView>
        <StyledView
          className={
            'flex-row mt-6 items-center shadow-md bg-white rounded-full px-10 p-3 '
          }>
          <StyledLabel
            className={'text-xl font-bold text-black ml-4 '}
            title={'Verified :'}
          />
          <StyledImage source={Images.verifyed} className={'w-7 h-7'} />
        </StyledView>
      </StyledView>
      <StyledButton
        className={'bg-[#ef8c45] py-3 w-1/3 rounded-xl self-center mt-4'}
        onpress={() => {
          Auth.signOut()
          navigation.replace(ROUTES.AUTH_STACK)
        }}>
        <StyledLabel
          title={'Log Out'}
          className={'text-center text-2xl text-white font-bold '}
        />
      </StyledButton>
    </SafeAreaView>
  )
}
