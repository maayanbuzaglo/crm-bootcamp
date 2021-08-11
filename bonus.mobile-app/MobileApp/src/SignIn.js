import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Input from './Input';
import SubmitButton from './SubmitButton';
import logo from './img/logo.jpeg';
import axios from 'axios';
import {goHome} from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    invalid: false,
  };

  /**
   * This function handles on change input sign in details.
   * While changing - shows the input on screen,
   * and save the values.
   */
  onChangeText = async (key, value) => {
    this.setState({[key]: value});
  };

  /**
   * This function handles on click login button.
   * Checks if user exist.
   */
  signIn = async () => {
    const formattedForm = {
      email: this.state.username,
      password: this.state.password,
    };
    axios
      .post('http://localhost:8005/login', {form: formattedForm})
      .then(function (response) {
        const userId = String(response.data.userId);
        const userType = response.data.type; //Gets the user type.
        const accessToken = response.data.accessToken;

        AsyncStorage.setItem('userId', userId);
        AsyncStorage.setItem('userToken', accessToken);
        if (userType === 'delivery person') {
          goHome();
        }
      })
      .catch(function (error) {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode={'cover'} />
        <Input
          placeholder="Email address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="grey"
          onChangeText={val => this.onChangeText('username', val)}
        />
        <Input
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor="grey"
          onChangeText={val => this.onChangeText('password', val)}
        />
        <SubmitButton title="LOGIN" onPress={this.signIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    opacity: 0.5,
    marginBottom: 50,
    width: 150,
    height: 150,
  },
});
