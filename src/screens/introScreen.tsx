import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


const getFullName = (
  firstName: string,
  secondName: string,
  thirdName: string,
) => {
  return firstName + ' ' + secondName + ' ' + thirdName;
};

const IntroScreen = ({navigation}: {navigation: DrawerNavigationProp<any>}) => {
  const [nickname, setNickname] = useState('Spot');
  const [isHungry, setIsHungry] = useState(true);

  return (
    <ScrollView style={{padding: 10}}>
      <Image
        source={require('../../assets/cat.png')}
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
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 20,
            fontFamily: 'PatrickHand-Regular',
            fontSize: 18,
          }}
          placeholder="Give me a nickname!"
          onChangeText={newText => setNickname(newText)}
          defaultValue={nickname}
        />
        {/* <Text style={{padding: 10, fontSize: 42}}>
        {nickname
          .split(' ')
          .map(word => word && '😸')
          .join(' ')}
      </Text> */}

        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default IntroScreen;
