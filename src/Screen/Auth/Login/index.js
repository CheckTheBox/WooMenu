import React, {useState} from 'react';
import {View, StatusBar, StyleSheet, Image} from 'react-native';
import GButton from '../../../component/GButton';
import {Mutation} from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {login} from '../../../Graphql/Actions/index';
import {Layout, Text, Input, Icon} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';

const Login = () => {
  const dispatch = useDispatch();

  const [username, setusername] = useState('admin');
  const [password, setpassword] = useState('Adm8n0ass');
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const Login = login => {
    setloading(true);
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
      })
      .catch(err => {
        var a = err.graphQLErrors[0].message;
        var n = a.indexOf(';:');
        SimpleToast.show(a.substring(n + 3));
        seterror(a.substring(n + 1));
        setloading(false);
      });
  };
  return (
    <Layout style={style.ViewStyle}>
      <View style={{flex: 1}}>
        <Layout level={'4'} style={{height: 300}}>
          <Image
            style={{flex: 1}}
            source={{
              uri:
                'http://menu-kaizen.checkthebox.uz/wp-content/uploads/2021/09/Снимок-экрана-2021-09-26-в-15.50.19.png',
              // 'https://img.indiefolio.com/fit-in/1100x0/filters:format(webp):fill(transparent)/project/body/388476be0eff4cc3096f58e67d81bac0.jpg',
            }}
          />
        </Layout>
      </View>
      <View style={{flex: 1}}>
        <Mutation mutation={login}>
          {(login, {data}) => (
            <View style={style.inputContainer}>
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
    </Layout>
  );
};

const style = StyleSheet.create({
  ViewStyle: {
    padding: 30,
    flex: 1,
    // backgroundColor: '#1b3022',
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
