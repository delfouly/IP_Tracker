import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type ButtonProps = {
  title: string;
  isDisabled?: boolean;
  titleStyle?: StyleProp<TextStyle>;
} & TouchableOpacityProps;

const Button = ({title, titleStyle, isDisabled, ...props}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, props.style]}
      disabled={isDisabled || props.disabled} // personal preference
      {...props}>
      <Text style={[styles.text, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'purple',
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
