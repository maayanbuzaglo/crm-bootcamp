import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Transition from './Transition';
import logo from './img/logo.jpeg';

import {goToAuth, goHome} from './navigation';

import {USER_KEY} from './config';

export default class Initialising extends React.Component {
  async componentDidMount() {
    setTimeout(async () => {
      try {
        const user = await AsyncStorage.getItem(USER_KEY);
        console.log('user: ', user);
        if (user) {
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
