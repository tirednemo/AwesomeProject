import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const RoutineScreen = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {
            title: '🐱 Morning Meow Madness',
            data: [
              '🥣 Chow time! Breakfast feast.',
              '🚽 Litter box cleanup extravaganza!',
              '🎾 Epic toy battle - defeat the laser pointer!',
              '💧 Water bowl refill and splash party.',
            ],
          },
          {
            title: '🌞 Afternoon Zzz Zone',
            data: [
              '🛁 Pamper paws: grooming session',
              '🧶 Interactive playtime - fetch the feather!',
              '😴 Short nap - recharge those kitty batteries.',
            ],
          },
          {
            title: '🌜 Evening Entertainment',
            data: [
              '🍽️ Dinner time - gourmet delights!',
              '🕵️‍♂️ Evening play session - hunt the shadow!',
              '❤️ Cuddle time - purr and purr!',
              '🛏️ Prepare for bedtime - snuggle into the blanket.',
            ],
          },
          {
            title: '🌙 Nighty Night',
            data: [
              '🚪 Final bathroom check - all clear!',
              '💧 Water bowl freshen-up - sip and snooze.',
              '🌌 Quiet time and purrfect rest.',
            ],
          },
        ]}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={item => `basicListEntry-${item}`}
      />
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
    marginVertical: 20,
    color: 'black',
  },
  item: {
    padding: 10,
    fontFamily: 'PatrickHand-Regular',
    fontSize: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
});
