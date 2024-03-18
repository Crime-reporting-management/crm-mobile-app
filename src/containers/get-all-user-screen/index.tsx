import { Alert, FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native'

import { HomeStackNavProps } from '@navigation'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Auth } from 'aws-amplify'
import axios from 'axios'
import Lottie from 'lottie-react-native'
import { ButtonComponent, LabelComponent } from '@components'
import { styled } from 'nativewind'
import { Modal } from 'react-native-paper'
import { ROUTES } from '@constants'

const StyledView = styled(View)
const StyledLabel = styled(LabelComponent)
const StyledSafe = styled(SafeAreaView)
const StyledTouchable = styled(ButtonComponent)

export const GetallUserScreen: React.FC<HomeStackNavProps<'GetallUserScreen'>> = ({
  navigation,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      getUserData()
    }, [])
  )

  const [getfir, setGetfir] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [hide, setHide] = useState(false)

  const getUserData = async () => {
    setLoading(true)
    const attributes = await Auth.currentUserInfo()

    await axios
      .get(`http://localhost:3000/user/getalluser/${attributes?.id}`, {})
      .then(res => {
        setGetfir(res?.data?.userdata)
        console.log(res?.data, 'fehsavdhsavdhsavdhdsvahv')
      })
      .catch(err => console.log(err, 'err getUserData'))
      .finally(() => {
        setLoading(false)
      })
  }
  const deleteUserById = async userId => {
    try {
      const response = await axios.delete(`http://localhost:3000/user/delete/${userId}`)
      if (response.status === 200) {
        console.log('User has been deleted successfully')
        Alert.alert('Complaint Deleted Successfully')
        getUserData()
      } else {
        console.error('Error deleting user')
      }
    } catch (error) {
      console.error('Error deleting user', error)
    }
  }

  return isLoading ? (
    <StyledView className={'bg-white flex-1 justify-center'}>
      <Lottie
        source={require('../../assets/imgs/84311-cop-riding-on-a-motorcycle.json')}
        autoPlay
        style={{
          height: '75%',
          width: '70%',
        }}
      />
    </StyledView>
  ) : (
    <StyledSafe>
      {/* <StyledLabel title={'Get All User Details'}/> */}
      <FlatList
        data={getfir}
        renderItem={({ item }) => {
          return (
            <ScrollView>
              {/* <StyledView className={'border-2 rounded-lg border-red-300 my-3  mx-4 '}> */}
              <StyledView className={'bg-white shadow rounded-lg my-3 p-4 mx-4 '}>
                <StyledView>
                  <StyledView className={'mt-2 pl-2 flex-row'}>
                    <StyledLabel
                      title={'FIR-Id :'}
                      className={'text-lg text-[#ffa726] font-medium'}
                    />

                    <StyledLabel
                      title={item?.fir_id}
                      className={'text-lg text-black font-medium mx-2'}
                    />
                  </StyledView>
                  <StyledView className={'m-2  flex-row'}>
                    <StyledLabel
                      title={'FIR-Content :'}
                      className={'text-lg text-[#ffa726] font-medium'}
                    />

                    <StyledLabel
                      title={item?.fir_content}
                      className={'text-lg text-black font-medium mx-2'}
                    />
                  </StyledView>
                  <StyledView className={'mx-2 mb-2 flex-row'}>
                    <StyledLabel
                      title={'Frist Name :'}
                      className={'text-lg text-[#ffa726] font-medium'}
                    />

                    <StyledLabel
                      title={item?.first_name}
                      className={'text-lg text-black font-medium mx-2'}
                    />
                  </StyledView>
                  <StyledView className={'mx-2 mb-2  flex-row'}>
                    <StyledLabel
                      title={'Last Name :'}
                      className={'text-lg text-[#ffa726] font-medium'}
                    />

                    <StyledLabel
                      title={item?.last_name}
                      className={'text-lg text-black font-medium mx-2'}
                    />
                  </StyledView>
                  <StyledView className={'mx-2 mb-2 flex-row'}>
                    <StyledLabel
                      title={'Mobile Name :'}
                      className={'text-lg text-[#ffa726] font-medium'}
                    />

                    <StyledLabel
                      title={item?.mobile_no}
                      className={'text-lg text-black font-medium mx-2'}
                    />
                  </StyledView>
                </StyledView>
                <StyledView className='flex-row justify-between items-center'>
                  <StyledTouchable
                    onpress={() => {
                      console.log(item?.user_id, 'sasas'),
                        navigation.navigate(ROUTES.HOME_STACK, {
                          screen: ROUTES.UPDATE_USER,
                          params: {
                            item,
                          },
                        })
                    }}
                    className={
                      'flex-row my-3 rounded-full w-[45%] bg-[#ffa726] justify-center py-2 px-4'
                    }>
                    <StyledLabel
                      title={'Status :'}
                      className={'text-lg text-white font-medium ml-2'}
                    />
                    <StyledLabel
                      title={item?.status}
                      className={'text-lg text-white font-medium mx-2'}
                    />
                  </StyledTouchable>
                  <StyledTouchable
                    onpress={() => {
                      deleteUserById(item?.user_id)
                    }}
                    className={
                      ' my-3 rounded-full bg-red-500 w-[45%] items-center py-2 px-4'
                    }>
                    <StyledLabel
                      title={'Delete'}
                      className={'text-lg text-white font-medium ml-2'}
                    />
                  </StyledTouchable>
                </StyledView>
              </StyledView>
            </ScrollView>
          )
        }}
      />
    </StyledSafe>
  )
}
