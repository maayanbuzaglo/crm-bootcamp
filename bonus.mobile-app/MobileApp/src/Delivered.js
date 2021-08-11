import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SubmitButton from './SubmitButton';
import Delivery from './Delivery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {goToAuth} from './navigation';
import axios from 'axios';

export default class Delivered extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {},
      },
    };
  }

  state = {
    orders: [],
  };

  async componentDidMount() {
    await this.deliveries();
  }

  /**
   * This function handles user logout.
   * Removes the userToken from AsyncStorage and go to sign up page.
   */
  logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      goToAuth();
    } catch (err) {
      console.log('error signing out...: ', err);
    }
  };

  /**
   * This function gets today user deliveries.
   */
  deliveries = async () => {
    const id = await AsyncStorage.getItem('userId');

    await axios
      .post('http://localhost:9991//orders/getDeliveredOrders/', {
        delivery_person_id: id,
      })
      .then(result => {
        console.log(result.data.orders);
        const ordersDetails = result.data.orders;
        this.setState({orders: ordersDetails});
      })
      .catch(err => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>YOUR PREVIOUS ORDERS</Text>
        <View>
          {this.state.orders.map(order => {
            return (
              <Delivery
                name={
                  order.first_name.toUpperCase() +
                  ' ' +
                  order.last_name.toUpperCase()
                }
                address={order.location}
                time={order.date}
                payment={order.total_price}
                status={order.status}
                onPress={() => {
                  this.showAlert(order.id);
                }}
              />
            );
          })}
        </View>
        <View style={styles.buttonsWrapper}>
          <SubmitButton
            onPress={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: 'Home',
                },
              });
            }}
            title="next orders"
          />
          <SubmitButton onPress={this.logout} title="Sign Out" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'optima',
    letterSpacing: 2,
    color: '#002c9b',
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 100,
    width: 320,
    marginTop: 40,
  },
});
