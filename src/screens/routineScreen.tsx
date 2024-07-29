import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const RoutineScreen = ({navigation, route}: {navigation: DrawerNavigationProp<any>; route: any}) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

export default RoutineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  sectionHeader: {
    textAlign: 'center',
    fontFamily: 'PatrickHand-Regular',
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    fontFamily: 'PatrickHand-Regular',
    fontSize: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
});
