import React from 'react';
import {Image, View, ImageProps} from 'react-native';
import tw from 'twrnc';

interface customImage extends ImageProps {
  className: string;
  src?: string;
}

export const ImageComponent: React.FC<customImage> = ({
  className,
  src,
  ...props
}) => {
  return (
    <View>
      <Image source={src} class={className} {...props} />
    </View>
  );
};
