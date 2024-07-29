import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AlarmFormModal from '../components/alarmForm';

interface Alarm {
  id: number;
  time: string;
  name?: string;
  days?: string[];
  isEnabled: boolean;
}

const AlarmScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  const toggleSwitch = (id: number) => {
    setAlarms(prevAlarms =>
      prevAlarms.map(alarm =>
        alarm.id === id ? {...alarm, isEnabled: !alarm.isEnabled} : alarm,
      ),
    );
  };

  const renderItem = ({item, index}: {item: Alarm; index: number}) => {
    const styles = getStyles(index % themes.length);
    const theme = themes[index % themes.length];

    return (
      <View style={styles.alarmItem}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 32,
                color: 'black',
                fontFamily: 'PatrickHand-Regular',
              }}>
              {item.time}
            </Text>
            {item.name && <Text>{item.name}</Text>}
          </View>
          <Switch
            trackColor={theme.switchTrackColor}
            thumbColor={item.isEnabled ? theme.switchThumbColor : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch(item.id)}
            value={item.isEnabled}
          />
        </View>
        {item.days && (
          <Text
            style={[
              styles.alarmDays,
              {
                padding: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
            ]}>
            {item.days.join(', ')}
          </Text>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={baseStyles.container}>
        <FlatList
          data={alarms}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
        <TouchableOpacity
          style={baseStyles.fab}
          onPress={() => setModalVisible(true)}>
          <Icon name="add" size={30} color="#EA882B" />
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <AlarmFormModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          alarms={alarms}
          setAlarms={setAlarms}
        />
      )}
    </>
  );
};

export default AlarmScreen;

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  alarmItem: {
    marginBottom: 10,
    borderRadius: 10,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 8,
  },
});

const themes = [
  {
    alarmItem: {
      backgroundColor: '#E7FFDC',
    },
    alarmDays: {
      backgroundColor: '#D7F4CA',
    },
    switchTrackColor: {
      false: '#767577',
      true: '#F7A140',
    },
    switchThumbColor: '#FFFFFF',
  },
  {
    alarmItem: {
      backgroundColor: '#EAF2FF',
    },
    alarmDays: {
      backgroundColor: '#D6E5FF',
    },
    switchTrackColor: {
      false: '#767577',
      true: '#CEE1FF',
    },
    switchThumbColor: '#FFFFFF',
  },
  {
    alarmItem: {
      backgroundColor: '#FAF6D4',
    },
    alarmDays: {
      backgroundColor: '#EFEABD',
    },
    switchTrackColor: {
      false: '#767577',
      true: '#F7A140',
    },
    switchThumbColor: '#FFFFFF',
  },
];

const getStyles = (themeIndex: number) => {
  const theme = themes[themeIndex];
  return StyleSheet.create({
    ...baseStyles,
    alarmItem: {
      ...baseStyles.alarmItem,
      ...theme.alarmItem,
    },
    alarmDays: {
      ...theme.alarmDays,
    },
    switchTrackColor: {
      ...theme.switchTrackColor,
    },
    switchThumbColor: theme.switchThumbColor,
  });
};
