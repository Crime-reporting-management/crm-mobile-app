import { Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import { HomeStackNavProps } from '@navigation'
import React from 'react'
import { styled } from 'nativewind'
import { LabelComponent } from '@components'

const StyledLabel = styled(LabelComponent)
const StyledView = styled(View)
export const ContectScreen: React.FC<HomeStackNavProps<'ContectScreen'>> = ({}) => {
  return (
    <SafeAreaView>
      <StyledLabel
        title={'Contact Us'}
        className={'text-black text-3xl mt-3 text-center font-bold'}
      />
      <StyledView className={'mt-6 mx-4'}>
        <StyledLabel
          title={'Goverment Site'}
          className={'ml-2 font-bold text-[#ef8c45] text-2xl'}
        />
        <StyledView className={'flex-row items-center mt-2'}>
          <StyledView className={'w-3 h-3 bg-[#ef8c45] rounded-full mx-3 ml-4 '} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://cybercrime.gov.in/')
            }}>
            <StyledLabel
              title={'cybercrime.gov.in'}
              className={'ml-2 font-normal text-blue-700 text-lg '}
            />
          </TouchableOpacity>
        </StyledView>
        <StyledView className={'flex-row items-center mt-2'}>
          <StyledView className={'w-3 h-3 bg-[#ef8c45] rounded-full mx-3 ml-4 '} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://pgportal.gov.in/')
            }}>
            <StyledLabel
              title={'pgportal.gov.in'}
              className={'ml-2 font-normal text-blue-700 text-lg '}
            />
          </TouchableOpacity>
        </StyledView>
        <StyledView className={'flex-row items-center mt-2'}>
          <StyledView className={'w-3 h-3 bg-[#ef8c45] rounded-full mx-3 ml-4 '} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://gujhome.gujarat.gov.in/')
            }}>
            <StyledLabel
              title={'gujhome.gujarat.gov.in'}
              className={'ml-2 font-normal text-blue-700 text-lg '}
            />
          </TouchableOpacity>
        </StyledView>
        <StyledView className={'flex-row items-center mt-2'}>
          <StyledView className={'w-3 h-3 bg-[#ef8c45] rounded-full mx-3 ml-4 '} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://ncrb.gov.in/')
            }}>
            <StyledLabel
              title={'ncrb.gov.in'}
              className={'ml-2 font-normal text-blue-700 text-lg '}
            />
          </TouchableOpacity>
        </StyledView>
      </StyledView>
      <StyledView className={'mt-8 mx-4'}>
        <StyledLabel
          title={'Contact Number'}
          className={'ml-2 font-bold text-[#ef8c45] text-2xl'}
        />
        <StyledView className={'flex-row items-center mt-2'}>
          <StyledView className={'w-3 h-3 bg-[#ef8c45] rounded-full mx-3 ml-4 '} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel:+911234567890')
            }}>
            <StyledLabel
              title={'(011) 2673540'}
              className={'ml-2 font-normal text-blue-700 text-lg '}
            />
          </TouchableOpacity>
        </StyledView>
      </StyledView>
    </SafeAreaView>
  )
}
