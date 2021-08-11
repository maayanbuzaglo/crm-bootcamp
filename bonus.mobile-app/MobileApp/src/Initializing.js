import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Transition from './Transition';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {goToAuth, goHome} from './navigation';

export default class Initializing extends React.Component {
  async componentDidMount() {
    setTimeout(async () => {
      try {
        const login = await AsyncStorage.getItem('userToken');
        console.log('login; ', login);
        if (login) {
          goHome();
        } else {
          goToAuth();
        }
      } catch (err) {
        console.log('error: ', err);
        goToAuth();
      }
    }, 3000);
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Transition />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
});
