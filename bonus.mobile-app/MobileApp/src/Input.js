import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

const Input = ({
  onChangeText,
  placeholder,
  placeholderTextColor,
  name,
  autoCapitalize,
  autoCorrect,
  secureTextEntry,
  // text,
  // isInvalid,
  // textExist,
  // isExist,
  // extraStyle,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        type={name}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        name={name}
        autoComplete={'off'}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
      />

      {/* <h5 className={styles.invalid} name={placeholder}>
        {isInvalid && text}
        {isExist && textExist}
      </h5> */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 310,
    fontSize: 18,
    fontWeight: '100',
    fontFamily: 'Optima',
    letterSpacing: 1,
    height: 60,
    paddingLeft: 20,
    borderWidth: 5,
    borderColor: '#f0f8ff',
    margin: 10,
    borderRadius: 30,
  },
});

export default Input;
