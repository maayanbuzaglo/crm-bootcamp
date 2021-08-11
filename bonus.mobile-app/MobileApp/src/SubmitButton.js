import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const SubmitButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    marginTop: 10,
    backgroundColor: '#002c9b',
    borderRadius: 30,
    width: 140,
    maxWidth: 150,
    minHeight: 40,
    maxHeight: 40,
    overflow: 'scroll',
  },
  appButtonText: {
    fontFamily: 'Optima',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 2,
    color: 'white',
    alignSelf: 'center',
    alignContent: 'center',
    textTransform: 'uppercase',
  },
});

export default SubmitButton;
