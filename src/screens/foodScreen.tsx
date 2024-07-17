import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const FoodScreen = ({navigation, route}: {navigation: DrawerNavigationProp<any>; route: any}) => {
  const name = route.params ? route.params.name : 'Cat';
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>These are what {name} likes.</Text>
      <FlatList
        data={[
          {key: 'Tuna'},
          {key: 'Salmon'},
          {key: 'Chicken'},
          {key: 'Turkey'},
          {key: 'Beef'},
          {key: 'Duck'},
          {key: 'Lamb'},
          {key: 'Rabbit'},
        ]}
        renderItem={({item, index}) => (
          <Text
            style={[
              styles.item,
              {backgroundColor: index % 2 === 0 ? '#E7FFDC' : '#FFF2E3'},
            ]}>
            {item.key}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* <SectionList
        sections={[
          {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      /> */}

      {/* <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Food', {name: route.params.name})}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Intro')} />
      <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
};

export default FoodScreen;

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
