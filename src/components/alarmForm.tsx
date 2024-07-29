import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { TimePickerModal } from 'react-native-paper-dates';
import Icon from 'react-native-vector-icons/Ionicons';

const AlarmFormModal = ({
  modalVisible,
  setModalVisible,
  alarms,
  setAlarms,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  alarms: any[];
  setAlarms: (alarms: any[]) => void;
}) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [alarmTime, setAlarmTime] = useState('00:00 AM');
  const [alarmName, setAlarmName] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [timePickerVisible, setTimePickerVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setTimePickerVisible(false);
  }, [setTimePickerVisible]);

  const onConfirm = React.useCallback(
    ({hours, minutes}: {hours: number; minutes: number}) => {
      setTimePickerVisible(false);
      setAlarmTime(`${hours}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`);
      console.log({hours, minutes});
    },
    [setTimePickerVisible],
  );

  const toggleDaySelection = (day: string) => {
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day],
    );
  };

  const saveAlarm = () => {
    const newAlarm = {
      id: alarms.length + 1,
      time: alarmTime,
      name: alarmName,
      days: selectedDays,
      isEnabled: true,
    };
    setAlarms([...alarms, newAlarm]);
    setModalVisible(false);
    setAlarmTime('');
    setAlarmName('');
    setSelectedDays([]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={50}>
        <View style={{marginTop: 'auto'}}>
          <View style={baseStyles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="close" size={30} color="#EA882B" />
              </Pressable>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Add New Alarm
              </Text>
              <Pressable onPress={saveAlarm}>
                <Icon name="checkmark-outline" size={30} color="#EA882B" />
              </Pressable>
            </View>
            <Text
              style={baseStyles.input}
              onPress={() => setTimePickerVisible(true)}>
              {alarmTime}
            </Text>

            <TextInput
              style={baseStyles.input}
              placeholder="Alarm Name"
              value={alarmName}
              onChangeText={setAlarmName}
            />
            <View style={{flexDirection: 'row'}}>
              {daysOfWeek.map(day => (
                <TouchableOpacity
                  key={day}
                  style={[
                    baseStyles.dayButton,
                    selectedDays.includes(day) && baseStyles.dayButtonSelected,
                  ]}
                  onPress={() => toggleDaySelection(day)}>
                  <Text>{day[0]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <TimePickerModal
        visible={timePickerVisible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12}
        minutes={14}
      />
    </Modal>
  );
};

export default AlarmFormModal;

const baseStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontFamily: 'PatrickHand-Regular',
    fontSize: 16,
  },
  dayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 999,
    borderWidth: 0,
    color: 'black',
    backgroundColor: '#E7E7E7',
  },
  dayButtonSelected: {
    backgroundColor: '#FF8A00',
    color: 'white',
  },
});
