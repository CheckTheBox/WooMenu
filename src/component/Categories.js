import React from 'react';
import {TouchableHighlight} from 'react-native';

import {Text} from '@ui-kitten/components';
import {TouchableOpacity, Image} from 'react-native';
import {ImageBackground} from 'react-native';

function CarC(props) {
  try {
    return (
      <TouchableOpacity
        style={{
          height: 210,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          shadowColor: '#000000',
          shadowOffset: {
            width: 12,
            height: 12,
          },
          margin: 4,
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
        onPress={() =>
          props.navigation.navigate('CatDetail', {data: props.data})
        }>
        <ImageBackground
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            width: '95%',
            height: '95%',
            resizeMode: 'cover',
          }}
          source={{uri: props.data.image.sourceUrl}}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              lineHeight: 32,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: '#00000090',
            }}>
            {props.data.name}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  } catch (e) {
    return (
      <TouchableOpacity
        style={{
          height: 210,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 12,
            height: 12,
          },
          margin: 4,
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
        onPress={() =>
          props.navigation.navigate('CatDetail', {data: props.data})
        }>
        <ImageBackground
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          source={{
            uri:
              'http://menu-kaizen.checkthebox.uz/wp-content/uploads/2021/09/original.jpg"',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              lineHeight: 32,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: '#00000090',
            }}>
            {props.data.name}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default CarC;
