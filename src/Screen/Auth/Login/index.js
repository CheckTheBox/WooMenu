import React, {useState} from 'react';
import { View, StatusBar, StyleSheet, Image, Dimensions, AppRegistry } from "react-native";
import GButton from '../../../component/GButton';
import ButtonC from '../../../component/Button';
import {Mutation} from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {login} from '../../../Graphql/Actions/index';
import {ThemeContext} from '../../../theme-context';
import {useNavigation} from '@react-navigation/native';
import {Layout, Text, Input, Icon} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import realm from '../../../../realm';
import uuid from 'react-native-uuid';
import { name as appName } from "../../../../app.json";
import App from "../../../App";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const server = realm.objects('Server').filtered('active == true')[0];
  let usernameDB, addressDB, passwordDB;
  if (server !== undefined) {
    usernameDB = server.username;
    passwordDB = server.password;
    addressDB = server.address;
  } else {
    usernameDB = '';
    passwordDB = '';
    addressDB = '';
  }

  const [username, setusername] = useState(usernameDB);
  const [password, setpassword] = useState(passwordDB);
  const [address, setserver] = useState(addressDB);
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const Login = login => {
    setloading(true);
    const old = realm.objects('Server');
    old.forEach(address => {
      realm.write(() => {
        realm.delete(address);
      });
    });
    realm.write(() => {
      realm.create('Server', {
        id: uuid.v4(),
        address: address,
        username: username,
        password: password,
        active: true,
      });
    });
    console.error(realm.objects('Server'));

    login({
      variables: {
        username: username,
        password: password,
      },
    })
      .then(res => {
        setloading(false);
        AsyncStorage.setItem('userToken', JSON.stringify(res.data.login));
        dispatch({type: 'LOGINUSER', user: res.data.login});
        // navigation.navigate('App');
      })
      .catch(err => {
        var a = err.graphQLErrors[0].message;
        var n = a.indexOf(';:');
        SimpleToast.show(a.substring(n + 3));
        seterror(a.substring(n + 1));
        setloading(false);
      });
  };
  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = style => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );
  let secondTextInput = null;
  return (
    <Layout style={style.ViewStyle}>
      <View style={{flex: 1}}>
        <Layout
          level={'4'}
          style={{
            height: 550,
            width: Dimensions.get('screen').width - 60,
            alignSelf: 'center',
            backgroundColor: '#ffffff00',
            paddingTop: 30,
          }}>
          <Image
            style={{
              flex: 1,
              alignSelf: 'center',
              width: Dimensions.get('screen').width - 60,
            }}
            source={require('../../../static/login_banner.png')}
          />
        </Layout>
      </View>
      <View style={{flex: 1, paddingTop: 60}}>
        <Mutation mutation={login}>
          {(login, {data}) => (
            <View style={style.inputContainer}>
              <Input
                placeholder={address}
                style={{marginTop: 10}}
                autoCapitalize="none"
                onChangeText={e => setserver(e)}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  secondTextInput.focus();
                }}
                blurOnSubmit={false}
              />
              <Input
                placeholder={username}
                style={{marginTop: 10}}
                autoCapitalize="none"
                onChangeText={e => setusername(e)}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  secondTextInput.focus();
                }}
                blurOnSubmit={false}
              />
              <Input
                ref={input => {
                  secondTextInput = input;
                }}
                placeholder="**********"
                style={{marginTop: 10}}
                secureTextEntry={secureTextEntry}
                icon={renderIcon}
                autoCapitalize="none"
                onIconPress={onIconPress}
                onChangeText={e => setpassword(e)}
                onSubmitEditing={() => Login(login)}
              />

              <GButton
                loading={loading}
                Text={'Открыть меню'}
                onPress={() => Login(login)}
              />
              <Text status="danger">{error}</Text>
            </View>
          )}
        </Mutation>
      </View>

      {/*<ButtonC Text={'REGISTER ?'} onPress={() => navigation.navigate('Register')} />*/}
    </Layout>
  );
};

const style = StyleSheet.create({
  ViewStyle: {
    padding: 30,
    flex: 1,
  },
  TextStyle: {
    marginTop: 20,
    fontSize: 30,
  },
  subTextStyle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Light',
  },
  inputStyle: {
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
  },
  inputContainer: {
    paddingTop: 40,
    flex: 1,
  },
});

const mapStateToProps = (state /*, ownProps*/) => {
  return {};
};

export default connect(mapStateToProps)(Login);
