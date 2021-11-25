import React from 'react';
import {
  Drawer,
  DrawerHeaderFooter,
  Layout,
  Button,
} from '@ui-kitten/components';
import {Text} from '@ui-kitten/components';

import {Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import * as RootNavigation from '../RootNavigation.js';
import {useDispatch} from 'react-redux';

const Header = props => (
  <DrawerHeaderFooter
    style={{marginTop: -4}}
    title={props.user.user.name}
    description={props.user.user.email}
    icon={() => (
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        source={{
          uri:
            'https://kaizen.woomenu.uz/wp-content/uploads/2021/09/kaizen.logo_.png',
        }}
      />
    )}
  />
);
const drawerData = [
  {
    title: <Text style={{fontSize: 20}}>🏡 Главная страница</Text>,
    route: 'Home',
  },
  {title: <Text style={{fontSize: 20}}>🛒 Корзина</Text>, route: 'Cart'},
  {title: <Text style={{fontSize: 20}}>🌗 Тема</Text>, route: 'Settings'},
];

const onRouteSelect = async index => {
  const route = drawerData[index];
  // navigate with React Navigation
  if (route.route === 'logout') {
    await AsyncStorage.removeItem('userToken');
    RootNavigation.navigate('Auth');
  } else {
    RootNavigation.navigate(route.route);
  }
};
function SideMenu(props) {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView contentContainerStyle={{flex: 1}} {...props}>
      <Layout
        style={{
          flex: 1,
        }}>
        <Drawer
          data={drawerData}
          header={() => <Header user={props.user} />}
          onSelect={onRouteSelect}
        />
        <Button
          onPress={async () => {
            await AsyncStorage.removeItem('userToken');
            dispatch({type: 'LOGOUTUSER'});
          }}>
          Выйти
        </Button>
      </Layout>
    </DrawerContentScrollView>
  );
}

export default SideMenu;
