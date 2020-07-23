import React, {useEffect, useState} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';

import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

import {fetchURL} from '../apiService';

const AbortController = window.AbortController;

export const BerriesListItem = props => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {name, url, index, isRefreshing} = props;
  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      setIsLoading(true);

      const response = await fetchURL(url, signal);

      setDetails(response);
      setIsLoading(false);

      return () => controller.abort();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = !isLoading && details != null;

  const renderDetails = () => {
    if (!isActive) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => Alert.alert(`This is ${name.toUpperCase()} berry.`)}
      disabled={!isActive}
      key={index}
      style={[
        styles.itemContainer,
        isRefreshing && styles.disableItemContainer,
      ]}>
      {renderDetails()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    color: 'navy',
    backgroundColor: '#F0FFFF',
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 65,
  },
});
