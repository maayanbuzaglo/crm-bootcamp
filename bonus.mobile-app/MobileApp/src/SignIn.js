import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
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

  onChangeText = async (key, value) => {
    this.setState({[key]: value});
  };

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
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button title="Sign In" onPress={this.signIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    color: 'white',
    padding: 8,
    borderRadius: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
