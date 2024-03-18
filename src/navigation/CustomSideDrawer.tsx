import { SafeAreaView, View } from 'react-native'

import React, { useEffect, useState } from 'react'
import { styled } from 'nativewind'
import { ButtonComponent, ImageComponent, LabelComponent } from '@components'
import { Images, ROUTES } from '@constants'
import { Auth } from 'aws-amplify'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Colors } from '@styles'
import { FlatList } from 'react-native-gesture-handler'

interface DrawerProps {}

const StyledView = styled(View)
const StyledSafeAreaView = styled(SafeAreaView)
const StyledImage = styled(ImageComponent)
const StyledLabel = styled(LabelComponent)
const StyledTouchable = styled(ButtonComponent)

export const CustomDrawer: React.FC<DrawerProps> = ({ navigation }) => {
  const [user, setUser] = useState(null)
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(false)
  const DATA =
    user?.id == 'ap-southeast-1:adb2fdbd-3e78-4ece-b042-1ca0f4c3090f'
      ? [
          {
            id: 1,
            title: 'Home',
            iconname: Images.Home,
            screen: {
              screen: ROUTES.HOME_STACK,
              params: { screen: ROUTES.DASHBOARD_SCREEN },
            },
          },
          {
            id: 3,
            title: 'Admin',
            iconname: Images.Info,
            screenss: [
              {
                id: 4.1,
                title: 'All User Complaints ',
                iconname: Images.fir,
                screen: {
                  screen: ROUTES.HOME_STACK,
                  params: { screen: ROUTES.GET_ALL_USER },
                },
              },
            ],
          },
          {
            id: 4,
            title: 'Settings',
            iconname: Images.setting,
            screen: {
              screen: ROUTES.HOME_STACK,
              params: { screen: ROUTES.SETTINGS_SCREEN },
            },
          },
          {
            id: 5,
            title: 'Contact',
            iconname: Images.contacts,
            screen: {
              screen: ROUTES.HOME_STACK,
              params: { screen: ROUTES.CONTECT_SCREEN },
            },
          },
        ]
      : [
          {
            id: 1,
            title: 'Home',
            iconname: Images.Home,
            screen: {
              screen: ROUTES.HOME_STACK,
              params: { screen: ROUTES.DASHBOARD_SCREEN },
            },
          },
          {
            id: 2,
            title: 'Complaints',
            iconname: Images.complaint,
            screens: [
              {
                id: 2.1,
                title: 'Add FIR',
                iconname: Images.fir,
                screen: {
                  screen: ROUTES.HOME_STACK,
                  params: { screen: ROUTES.ADD_FIR_SCREEN },
                },
              },
              {
                id: 2.2,
                title: 'FIR History',
                iconname: Images.firhistory,
                screen: {
                  screen: ROUTES.HOME_STACK,
                  params: { screen: ROUTES.FIR_HISTORY_SCREEN },
                },
              },
            ],
          },
          {
            id: 3,
            title: 'Settings',
            iconname: Images.setting,
            screen: {
              screen: ROUTES.HOME_STACK,
              params: { screen: ROUTES.SETTINGS_SCREEN },
            },
          },
          {
            id: 5,
            title: 'Contact',
            iconname: Images.contacts,
            screen: {
              screen: ROUTES.HOME_STACK,
              params: { screen: ROUTES.CONTECT_SCREEN },
            },
          },
        ]

  useEffect(() => {
    fetchCurrentSessions()
  }, [])

  const fetchCurrentSessions = async () => {
    const attributes = await Auth.currentUserInfo()
    setUser(attributes)
    console.log(attributes, 'sasasas')
  }

  return (
    <StyledSafeAreaView className={'flex-1'}>
      <StyledView className="mb-6">
        <StyledImage source={Images.profile} className={'h-20 w-20 self-center mt-10'} />
        <StyledLabel
          title={user?.attributes?.name}
          className={'text-lg self-center mt-2 font-medium text-black'}
        />
      </StyledView>
      {/* <StyledView> */}
      <FlatList
        data={DATA}
        style={{}}
        renderItem={({ item }) => {
          return (
            <>
              <StyledView className={''}>
                <StyledTouchable
                  onpress={() => {
                    item.screen &&
                      navigation.navigate(item.screen.screen, item.screen.params)
                  }}>
                  <StyledView className={'flex-row items-center my-2'}>
                    <StyledImage source={item.iconname} className={'w-7 h-7 ml-5'} />
                    <StyledLabel
                      title={item.title}
                      className={'text-xl  font-extrabold text-black py-2 px-5'}
                    />
                    {item.title == 'Complaints' && (
                      <StyledTouchable
                        onpress={() => setShow(!show)}
                        className={'flex-1  items-end mr-5'}>
                        <Icon name="chevron-down" size={20} color={Colors.BLACK} />
                      </StyledTouchable>
                    )}
                    {item.title == 'Admin' && (
                      <StyledTouchable
                        onpress={() => setHide(!hide)}
                        className={'w-[50%] items-end pr-5'}>
                        <Icon name="chevron-down" size={20} color={Colors.BLACK} />
                      </StyledTouchable>
                    )}
                  </StyledView>
                </StyledTouchable>
              </StyledView>
              {show && (
                <StyledView>
                  <FlatList
                    data={item.screens}
                    renderItem={({ item }) => (
                      <StyledTouchable
                        onpress={() => {
                          item.screen &&
                            navigation.navigate(item.screen.screen, item.screen.params)
                        }}>
                        <StyledView className={'flex-row ml-10 py-3'}>
                          <StyledImage
                            className={'w-7 h-7 mx-2 '}
                            source={item.iconname}
                          />
                          <StyledLabel
                            title={item.title}
                            className={'text-lg  font-extrabold text-black '}
                          />
                        </StyledView>
                      </StyledTouchable>
                    )}
                  />
                </StyledView>
              )}
              {hide && (
                <StyledView>
                  <FlatList
                    data={item.screenss}
                    renderItem={({ item }) => (
                      <StyledTouchable
                        onpress={() => {
                          item.screen &&
                            navigation.navigate(item.screen.screen, item.screen.params)
                        }}>
                        <StyledView className={'flex-row ml-10 py-3'}>
                          <StyledImage
                            className={'w-7 h-7 mx-2 '}
                            source={item.iconname}
                          />
                          <StyledLabel
                            title={item.title}
                            className={'text-lg  font-extrabold text-black '}
                          />
                        </StyledView>
                      </StyledTouchable>
                    )}
                  />
                </StyledView>
              )}
            </>
          )
        }}
      />
    </StyledSafeAreaView>
    // </StyledView>
  )
}
