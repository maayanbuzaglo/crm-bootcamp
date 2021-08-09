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
    color: 'red',
    marginTop: 10,
    backgroundColor: '#002c9b',
    borderRadius: 30,
    paddingTop: 15,
    paddingBottom: 15,
    width: 150,
    height: 50,
  },
  appButtonText: {
    fontFamily: 'Optima',
    fontSize: 18,
    letterSpacing: 2,
    color: 'white',
    alignSelf: 'center',
    alignContent: 'center',
    textTransform: 'uppercase',
  },
});

export default SubmitButton;
