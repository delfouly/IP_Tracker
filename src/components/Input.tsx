import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';

type InputProps = {
  errorMessage?: string;
  errorStyle?: StyleProp<TextStyle>;
} & TextInputProps;

const Input = ({errorMessage, errorStyle, ...props}: InputProps) => {
  return (
    <>
      <TextInput
        style={[styles.ipInput, props.style]}
        placeholder="Enter IP Address"
        {...props}
      />
      {errorMessage && (
        <Text style={[styles.error, errorStyle]}>{errorMessage}</Text>
      )}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  ipInput: {
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  error: {
    marginHorizontal: 12,
    color: '#EE4B2B',
    marginBottom: 8,
  },
});
