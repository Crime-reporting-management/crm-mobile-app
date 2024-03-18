import React, {useRef, useState} from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

import tw from 'twrnc';

interface TextinputProps extends TextInputProps {}

export const PhoneInputComponent: React.FC<TextinputProps> = ({}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  return (
    <View>
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="IN"
        onChangeText={text => {
          setValue(text);
        }}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        autoFocus
        codeTextStyle={{height: 25}}
        // textContainerStyle={{padding: 2, heiht: 25}}
        containerStyle={{
          width: '85%',
          height: 45,
          alignSelf: 'center',
        }}
        // containerStyle={tw`text`}
        textInputStyle={{
          height: 35,
          paddingTop: 3,
          marginTop: 4,
        }}
      />
    </View>
  );
};
