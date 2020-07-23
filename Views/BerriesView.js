import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Platform,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SearchBar} from 'react-native-elements';

import {fetchBerries} from '../apiService';
import {useDebounce} from '../hooks/useDebounce';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {BerriesListItem} from '../components/BerriesListItem';

const BerriesView = ({navigation}) => {
  const [data, setData] = useState([]);
  const [source, setSource] = useAsyncStorage('@berriesList');

  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const list = await AsyncStorage.getItem('@berriesList');

      if (list == null) {
        const response = await fetchBerries();
        setSource(response.results);
      }
      setData(source);
    })();
  }, []);

  const refreshBerriesList = async () => {
    setIsRefreshing(true);
    const response = await fetchBerries();
    await setSource(response.results);
    setData(source);
    setIsRefreshing(false);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filterBerries = useCallback(
    term =>
      source.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()),
      ),
    [source],
  );

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredBerries = filterBerries(debouncedSearchTerm);
      setData(filteredBerries);
    } else {
      setData(source);
    }
  }, [debouncedSearchTerm, source, filterBerries]);

  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';
  const isLoading = data == null;

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor="black" />

      <SafeAreaView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <SearchBar
              round
              noIcon
              lightTheme
              onChangeText={text => setSearchTerm(text)}
              onClear={text => setSearchTerm('')}
              placeholder="Search"
              value={searchTerm}
            />
            <FlatList
              onRefresh={refreshBerriesList}
              refreshing={isRefreshing}
              data={data}
              scrollEnabled={!isRefreshing}
              keyExtractor={(item, index) => item.name + index}
              windowSize={2}
              renderItem={({item, index}) => {
                return (
                  <BerriesListItem
                    isRefreshing={isRefreshing}
                    name={item.name}
                    index={index}
                    url={item.url}
                    navigation={navigation}
                  />
                );
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default BerriesView;
