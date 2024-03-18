import { Text, TextProps, View } from 'react-native'

import React from 'react'
import tw from 'twrnc'
import { styled } from 'nativewind'

interface LabelProps extends TextProps {
  title: string
}

const StyledText = styled(Text)

export const LabelComponent: React.FC<LabelProps> = ({ title, ...props }) => {
  return (
    <View>
      <StyledText {...props}>{title}</StyledText>
    </View>
  )
}
