import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

export default (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Text> &
    Readonly<TextProps>,
) => {
  const defaultStyle = styles.defaultText;
  const incomingStyle = Array.isArray(props.style)
    ? props.style
    : [props.style];
  return <Text {...props} style={[defaultStyle, ...incomingStyle]} />;
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'PatrickHand-Regular',
  },
});
