import React from 'react';
import {ImageBackground, ImageResizeMode} from 'react-native';
import tw from 'twrnc';

interface CustomImageBackgroundProps {
  src: string;
  children?: React.ReactNode;
  resizeMode?: ImageResizeMode;
  className: string;
}

export const ImageBackgroundComponent: React.FC<CustomImageBackgroundProps> = ({
  src,
  children,
  className,
  resizeMode,
  ...props
}) => {
  return (
    <ImageBackground
      source={src}
      className={className}
      //   style={{height: '20%', width: 25}}
      {...props}
      resizeMode={resizeMode}>
      {children}
    </ImageBackground>
  );
};
