import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/Ionicons';
import { decrement, increment, selectCount } from '../redux/slices/counterSlice';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

const {VoiceChangingModule} = NativeModules;

const audioRecorderPlayer = new AudioRecorderPlayer();
const getFullName = (
  firstName: string,
  secondName: string,
  thirdName: string,
) => {
  return firstName + ' ' + secondName + ' ' + thirdName;
};

const IntroScreen = ({navigation}: {navigation: DrawerNavigationProp<any>}) => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [nickname, setNickname] = useState('Spot');
  const [isHungry, setIsHungry] = useState(true);
  const [recordedAudioPath, setRecordedAudioPath] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.5,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const audioTrackURL =
    'https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-1.mp3';

  const startRecording = async () => {
    setIsRecording(true);
    const result = await audioRecorderPlayer.startRecorder();
    setRecordedAudioPath(result);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordedAudioPath(result);
    changeToChild(result);
  };

  const changeToChild = (audioPath: string) => {
    if (Platform.OS === 'android' && audioPath) {
      VoiceChangingModule.changeVoiceToChild(audioPath);
    }
  };

  return (
    <ScrollView style={{padding: 10}}>
      <Image
        source={require('../assets/images/cat.png')}
        style={{marginBottom: 20, width: 150, height: 150, alignSelf: 'center'}}
      />
      <View style={{alignItems: 'center', gap: 10}}>
        <Text style={{fontFamily: 'PatrickHand-Regular', fontSize: 20}}>
          Hello, I am {isHungry ? 'hungry' : 'full'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIsHungry(false);
          }}
          disabled={!isHungry}
          style={{
            backgroundColor: '#FF8A00',
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'PatrickHand-Regular',
              fontSize: 20,
            }}>
            {isHungry ? 'Give me some food, please!' : 'Thank you!'}
          </Text>
        </TouchableOpacity>
        <Text style={{fontFamily: 'PatrickHand-Regular', fontSize: 20}}>
          My full name is {getFullName('Rum', 'Tum', 'Tugger')}! Give me a
          nickname.
        </Text>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              fontFamily: 'PatrickHand-Regular',
              fontSize: 18,
            }}
            placeholder="Give me a nickname!"
            onChangeText={newText => setNickname(newText)}
            defaultValue={nickname}
          />
          <TouchableOpacity
            onPressIn={startRecording}
            onPressOut={stopRecording}>
            <Animated.View style={{transform: [{scale: pulseAnim}]}}>
              <Icon name="mic" size={30} color="#000" />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* <Text style={{padding: 10, fontSize: 42}}>
        {nickname
          .split(' ')
          .map(word => word && '😸')
          .join(' ')}
      </Text> */}

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Food', {name: nickname})}
          style={{
            backgroundColor: '#FF8A00',
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'PatrickHand-Regular',
              fontSize: 20,
              color: 'white',
            }}>{`See what ${nickname} likes`}</Text>
        </TouchableOpacity> */}

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Image
            source={require('../assets/images/needycat.png')}
            style={{
              width: 230,
              height: 230,
            }}
          />
          <View style={{flexDirection: 'column', gap: 5}}>
            <TouchableOpacity
              onPress={() => dispatch(decrement())}
              style={{
                backgroundColor: '#FF8A00',
                borderRadius: 10,
                padding: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'PatrickHand-Regular',
                  fontSize: 20,
                  color: 'white',
                }}>{`Pinch ${nickname}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(increment())}
              style={{
                backgroundColor: '#FF8A00',
                borderRadius: 10,
                padding: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'PatrickHand-Regular',
                  fontSize: 20,
                  color: 'white',
                }}>{`Pet ${nickname}`}</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'PatrickHand-Regular',
                fontSize: 20,
                marginTop: 10,
              }}>{`Friendship: ${count}`}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default IntroScreen;