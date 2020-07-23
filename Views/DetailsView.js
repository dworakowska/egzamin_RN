import * as React from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';

import {useAsyncStorage} from '../hooks/useAsyncStorage';
import AnimatedBar from '../components/AnimatedBar';
import LinearGradient from 'react-native-linear-gradient';

const DetailsView = ({route}) => {
  const {name, desc} = route.params;
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${name}`,
  );

  if (!detailsSource) return <ActivityIndicator />;

  return (
    <LinearGradient colors={['#69B9E3', '#559EDF']} style={styles.container}>
      <Image
        source={{uri: detailsSource.sprites.front_default}}
        style={styles.image}
      />
      <View style={styles.roundedCard}>
        <Text style={styles.pokeName}>{name}</Text>
        <View style={styles.stats}>
          {detailsSource.stats.map((item, index) => (
            <View key={index} style={styles.statsContainer}>
              <Text
                style={styles.statsText}>{`${item.stat.name.toUpperCase()}: ${
                item.base_stat
              }`}</Text>
              <AnimatedBar value={item.base_stat} index={index} />
            </View>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsText: {
    color: 'navy',
    margin: 1,
  },
  pokeName: {
    fontFamily: 'Avenir',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 40,
    lineHeight: 55,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#4F4F4F',
    top: '5%',
  },
  image: {
    alignItems: 'center',
    top: '20%',
    width: 170,
    height: 170,
  },
  roundedCard: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 48,
    width: '100%',
    top: '20%',
    height: 600,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Avenir',
    fontStyle: 'normal',
    margin: 12,
    color: 'red',
    top: '10%',
    width: '100%',
  },
};

export default DetailsView;
