import { SafeAreaView, FlatList, View, ScrollView } from 'react-native'

import { HomeStackNavProps } from '@navigation'
import React, { useState } from 'react'
import { LabelComponent } from '@components'
import { styled } from 'nativewind'
import { Auth } from 'aws-amplify'
import axios from 'axios'
import Lottie from 'lottie-react-native'
import { useFocusEffect } from '@react-navigation/native'

const StyledView = styled(View)
const StyledLabel = styled(LabelComponent)
const StyledSafe = styled(SafeAreaView)

export const HistoryScreen: React.FC<HomeStackNavProps<'HistoryScreen'>> = ({
  navigation,
}) => {
  const [getfir, setGetfir] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      getUserData()
    }, [])
  )

  const [isLoading, setLoading] = useState(true)

  const getUserData = async () => {
    setLoading(true)
    const attributes = await Auth.currentUserInfo()

    await axios
      .get(`http://localhost:3000/user/get/${attributes?.id}`, {})
      .then(res => {
        setGetfir(res?.data?.userdata)
      })
      .catch(err => console.log(err, 'err getUserData'))
      .finally(() => {
        setLoading(false)
      })
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
      <StyledLabel
        title={'User FIR History '}
        className={'text-3xl font-extrabold text-[#ffa726] text-center my-3'}
      />

      <FlatList
        data={getfir}
        renderItem={({ item }) => {
          return (
            <ScrollView>
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
                <StyledView
                  className={
                    'flex-row mx-3 my-3 rounded-full bg-[#ffa726] justify-center py-2'
                  }>
                  <StyledLabel
                    title={'Status :'}
                    className={'text-lg text-white font-medium ml-2 '}
                  />
                  <StyledLabel
                    title={item?.status}
                    className={'text-lg text-white font-medium mx-2 '}
                  />
                </StyledView>
              </StyledView>
            </ScrollView>
          )
        }}
      />
    </StyledSafe>
  )
}
