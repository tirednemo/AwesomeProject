import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppSelector, useAppDispatch} from '../utils/hooks';
import {add, TodoState, toggle} from '../redux/slices/todoSlice';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const RoutineScreen = () => {
  const toDoList = useAppSelector(state => state.todo);
  const dispatch = useAppDispatch();

  const prepareList = () => {
    const groupedByHour = toDoList.reduce((acc, item) => {
      if (!acc[item.hour]) {
        acc[item.hour] = [];
      }
      acc[item.hour].push(item);
      return acc;
    }, {} as Record<string, TodoState[]>);

    const list = Object.keys(groupedByHour).map(hour => ({
      title: hour,
      data: groupedByHour[hour],
    }));
    return list;
  };
  let list = prepareList();

  useEffect(() => {
    list = prepareList();
  }, [toDoList]);

  const [modalVisible, setModalVisible] = useState(false);

  const TaskFormModal = ({
    modalVisible,
    setModalVisible,
  }: {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
  }) => {
    const [taskName, settaskName] = useState('');

    const saveTask = () => {
      const newtask = {
        text: taskName,
        hour: 'morning',
      };
      dispatch(add(newtask));
      setModalVisible(false);
      settaskName('');
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
            <View style={styles.modalView}>
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
                  Add New Task
                </Text>
                <Pressable onPress={saveTask}>
                  <Icon name="checkmark-outline" size={30} color="#EA882B" />
                </Pressable>
              </View>

              <TextInput
                style={styles.input}
                placeholder="task Name"
                value={taskName}
                onChangeText={settaskName}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <SectionList
          sections={list}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          renderItem={({item}) => (
            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                isChecked={item.completed}
                onPress={() => {
                  dispatch(toggle(item.id));
                }}
              />
              <Text style={styles.item}>{item.text}</Text>
            </View>
          )}
          keyExtractor={item => `basicListEntry-${item.id}`}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)}>
          <Icon name="add" size={30} color="#EA882B" />
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <TaskFormModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
