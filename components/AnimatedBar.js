import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

const AnimatedBar = ({value, index}) => {
  const width = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.timing(width, {
      toValue: value,
      delay: index * 150,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animate();
  }, [value]);

  const interpolatedValue = width.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 100],
  });

  return <Animated.View style={[styles.bar, {width: interpolatedValue}]} />;
};

const styles = {
  bar: {
    height: 8,
    backgroundColor: '#516AAC',
    borderRadius: 10,
  },
};

export default AnimatedBar;
