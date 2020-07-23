import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SearchBar} from 'react-native-elements';

import {fetchPokemonsList} from '../apiService';
import {useDebounce} from '../hooks/useDebounce';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {ListItem} from '../components/ListItem';

const HomeView = ({navigation}) => {
  const [data, setData] = useState([]);
  const [source, setSource] = useAsyncStorage('@pokeDexList');

  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const list = await AsyncStorage.getItem('@pokeDexList');

      if (list == null) {
        const response = await fetchPokemonsList();
        setSource(response.results);
      }
      setData(source);
    })();
  }, []);

  const refreshPokemonsList = async () => {
    setIsRefreshing(true);
    const response = await fetchPokemonsList();
    await setSource(response.results);
    setData(source);
    setIsRefreshing(false);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filterPokemons = useCallback(
    term =>
      source.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()),
      ),
    [source],
  );

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredPokemons = filterPokemons(debouncedSearchTerm);
      setData(filteredPokemons);
    } else {
      setData(source);
    }
  }, [debouncedSearchTerm, source, filterPokemons]);

  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';
  const isLoading = data == null;

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor="black" />
      <SafeAreaView style={styles.appContainer}>
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
              style={styles.search}
            />
            <FlatList
              onRefresh={refreshPokemonsList}
              refreshing={isRefreshing}
              data={data}
              scrollEnabled={!isRefreshing}
              keyExtractor={(item, index) => item.name + index}
              windowSize={2}
              renderItem={({item, index}) => {
                return (
                  <ListItem
                    isRefreshing={isRefreshing}
                    name={item.name}
                    desc={item.desc}
                    index={index}
                    url={item.url}
                    navigation={navigation}
                    styles={styles.itemContainer}
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

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#F0FFFF',
    flex: 1,
    alignItems: 'stretch',
  },
  itemContainer: {
    padding: 8,
    backgroundColor: 'white',
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
  search: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    height: 36,
    borderRadius: 18,
  },
});

export default HomeView;
