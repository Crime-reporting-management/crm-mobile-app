import {Pressable, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';

interface CheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
  iconsize: number;
  color: string;
}

export const CheckBoxComponent: React.FC<CheckBoxProps> = ({
  isChecked,
  iconsize,
  color,
  onPress,
}) => {
  const iconname = isChecked ? 'checkbox-active' : 'checkbox-passive';

  return (
    <View>
      <Pressable onPress={onPress}>
        <Icon name={iconname} size={iconsize} color={color} />
      </Pressable>
    </View>
  );
};
