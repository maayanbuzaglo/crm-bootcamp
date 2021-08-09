import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Input from './Input';
import SubmitButton from './SubmitButton';
import logo from './img/logo.svg';
import axios from 'axios';
import {goHome} from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';

export default class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
  };

  /**
   * This function checks if the user is logged in.
   * @returns if logged in.
   */
  isLogin = async () => {
    const login = await AsyncStorage.getItem('userToken');
    return login;
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
        const userType = response.data.type; //Gets the user type.
        const accessToken = response.data.accessToken;

        // window.localStorage.setItem('account_id', response.data.accountId);

        AsyncStorage.setItem('userToken', accessToken);
        if (userType === 'delivery person') {
          goHome();
        }
      })
      .catch(function (error) {
        //The incorrect input.
        // let errorType = error.response.data.errors;
        // //If email input is empty.
        // if (!form.email.value) errorType = 'email';
        // //Sets the invalid input text in the page.
        // setForm(prevForm => ({
        //   ...prevForm,
        //   [errorType]: {
        //     value: prevForm[errorType].value,
        //     isInvalid: true,
        //   },
        // }));
      });
  };

  render() {
    return !this.isLogin() ? (
      <Home />
    ) : (
      <View style={styles.container}>
        <Image
          source={require('./img/logo.svg')}
          style={styles.logo}
          resizeMode={'cover'}
        />
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
    width: 50,
    height: 50,
  },
});
