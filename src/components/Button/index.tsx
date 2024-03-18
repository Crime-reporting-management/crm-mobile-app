import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import React from 'react'
import tw from 'twrnc'

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  onpress?: () => void
}

export enum ButtonVariant {
  Continue = 'continue',
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  onpress,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} onPress={onpress}>
      {children}
    </TouchableOpacity>
  )
}
