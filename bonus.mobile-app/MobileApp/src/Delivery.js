import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Moment from 'moment';

const Delivery = ({name, address, time, payment, status, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.date}>{Moment(time).format('MMMM Do YYYY')}</Text>
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}>{address}</Text>
        <Text style={styles.text}>{Moment(time).format('HH:mm')}</Text>
        {status === '1' ? (
          <Text style={{color: 'green', fontSize: 22, fontFamily: 'optima'}}>
            {payment}
          </Text>
        ) : (
          <Text style={{color: 'red', fontSize: 22, fontFamily: 'optima'}}>
            {payment}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    maxHeight: 140,
    minWidth: 300,
    maxWidth: 300,
    backgroundColor: '#f0f8ff',
    borderRadius: 30,
  },
  name: {
    fontFamily: 'optima',
    marginBottom: 8,
    fontWeight: '500',
  },
  text: {
    fontFamily: 'optima',
    marginBottom: 8,
  },
  date: {
    width: 70,
    marginRight: 20,
    fontFamily: 'Optima',
    fontSize: 23,
    color: '#002c9b',
    fontWeight: '400',
  },
});

export default Delivery;
