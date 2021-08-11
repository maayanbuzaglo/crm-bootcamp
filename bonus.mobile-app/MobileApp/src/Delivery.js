import {View, Text, Button, StyleSheet} from 'react-native';
import Moment from 'moment';

const Delivery = ({name, address, time, payment, status}) => {
  return (
    <View className={styles.deliveries}>
      <View>
        <Text>{Moment(time).format('MMMM Do YYYY')}</Text>
      </View>
      <View>
        <Text>{name}</Text>
        <Text>{address}</Text>
        <Text>{Moment(time).format('HH:mm')}</Text>
        {status === '1' ? (
          <Text style={{color: 'green', fontSize: '22px'}}>{payment}</Text>
        ) : (
          <Text style={{color: 'red', fontSize: '22px'}}>{payment}</Text>
        )}
      </View>
    </View>
  );
};

export default Delivery;
