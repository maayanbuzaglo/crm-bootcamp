import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';

const Transition = ({screen}) => {
  const [ballAnim, setBallAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    setTimeout(() => {
      if (screen === 'logout') animateLogout();
      else animateSplashScreen();
    }, 0.1);
  }, []);

  const animateSplashScreen = () => {
    Animated.timing(ballAnim, {
      duration: 1000,
      toValue: 200,
      useNativeDriver: false,
    }).start();

    Animated.sequence([
      Animated.timing(ballAnim, {
        duration: 1000,
        toValue: 150,
        useNativeDriver: false,
      }),
    ]);
  };

  const ballAnimation = {
    width: ballAnim,
    height: ballAnim,
    borderRadius: ballAnim,
  };

  return (
    <>
      <Animated.Image
        resizeMode={'contain'}
        source={require('./img/initLogo.png')}
        style={[styles.logo, ballAnimation]}
      />
      <Animated.Image
        resizeMode={'contain'}
        source={require('./img/initLogo2.png')}
        style={[styles.logo2, ballAnimation]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    opacity: 0.5,
    marginBottom: 0,
    width: 150,
    height: 150,
  },
  logo2: {
    opacity: 0.5,
    marginBottom: 380,
    marginTop: -120,
    width: 100,
    height: 100,
  },
});
export default Transition;
