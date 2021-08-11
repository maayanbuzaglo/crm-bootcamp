import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {goToAuth} from './navigation';
import {Navigation} from 'react-native-navigation';

import {USER_KEY} from './config';

export default class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home',
        },
      },
    };
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
    const id = AsyncStorage.getItem('userId');
    await axios
      .post('http://localhost:9991//orders/getOrdersDetails/', {
        delivery_person_id: id,
      })
      .then(result => {
        const ordersDetails = result.data.orders;
        console.log(ordersDetails);
        // setOrders(ordersDetails);
      })
      .catch(err => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>YOUR UPCOMING ORDERS</Text>
        <Button onPress={this.logout} title="Sign Out" />
        <View>
          {/* {orders.map((order) => {
            return (
              <Delivery
                name={
                  order.first_name.toUpperCase() +
                  " " +
                  order.last_name.toUpperCase()
                }
                address={order.location}
                time={order.date}
                payment={order.total_price}
                status={order.status}
              />
            );
          })} */}
        </View>
        {/* <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Screen2',
              },
            });
          }}
          title="View next screen"
        /> */}
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
  title: {
    fontSize: 20,
    fontFamily: 'optima',
    letterSpacing: 2,
    color: '#002c9b',
  },
});
