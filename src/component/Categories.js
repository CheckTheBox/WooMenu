import React from 'react';
import {Dimensions, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {TouchableOpacity, Image} from 'react-native';
import {ImageBackground} from 'react-native';
import * as RootNavigation from '../RootNavigation';

let width = Dimensions.get('screen').width;

function CarC(props) {
  let image;
  if (props.data.image !== null) {
    image = props.data.image.sourceUrl;
  } else {
    image = '';
  }
  let b = props.data.name.length;
  return (
    <TouchableOpacity
      style={{
        height: 210,
        flex: 0,
        justifyContent: 'center',
        padding: 2,
        borderWidth: 1,
        borderColor: '#C6C8CE80',
        margin: 4,
        // marginTop: 20,
        marginBottom: 20,
        width: width / 2 - 36,
        elevation: 14,
      }}
      onPress={() => {
        RootNavigation.navigate('CategoryDetail', {data: props.data});
      }}>
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: 'center',
          resizeMode: 'cover',
        }}
        source={{uri: image}}>
        <View>
          <View
            style={{
              alignSelf: 'center',
              padding: 24,
              backgroundColor: '#00000090',
              alignContent: 'center',
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 28,
                lineHeight: 32,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {props.data.name}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
function Category(props) {
  let image;
  if (props.data.category.image !== null) {
    image = props.data.category.image;
  } else {
    image = '';
  }
  return (
    <TouchableOpacity
      style={{
        height: ((width / 2 - 32) / 11) * 9,
        flex: 0,
        justifyContent: 'center',
        padding: 0,
        borderWidth: 1,
        borderColor: '#C6C8CE80',
        margin: 10,
        width: width / 2 - 32,
      }}
      onPress={() => {
        RootNavigation.navigate('CategoryDetail', {data: props});
      }}>
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: 'center',
          resizeMode: 'cover',
        }}
        source={{uri: image}}>
        <View>
          <View
            style={{
              alignSelf: 'center',
              padding: 20,
              backgroundColor: 'rgba(44,44,44,0.6)',
              alignContent: 'center',
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 32,
                lineHeight: 32,
                fontWeight: 'normal',
                textAlign: 'center',
                fontFamily: 'Montserrat-Medium',
              }}>
              {props.data.category.name}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export {CarC, Category};
