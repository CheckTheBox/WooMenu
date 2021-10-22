import {View} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';

const BackIcon = style => <Icon {...style} name="arrow-back" />;

const CartIcon = style => <Icon {...style} name="shopping-cart-outline" />;

const MenuIcon = style => <Icon {...style} name="menu-outline" />;

const BackAction = props => <TopNavigationAction {...props} icon={BackIcon} />;

const CartAction = props => <TopNavigationAction {...props} icon={CartIcon} />;

const MenuAction = props => <TopNavigationAction {...props} icon={MenuIcon} />;

const HeaderC = ({heading, Cart, current_menu}, props) => {
  const navigation = useNavigation();
  let renderLeftControl;
  // const onBackPress = () => {};

  if (current_menu === 'main_menu') {
    renderLeftControl = () => (
      <MenuAction onPress={() => navigation.openDrawer()} />
    );
  } else {
    renderLeftControl = () => (
      <BackAction onPress={() => navigation.goBack()} />
    );
  }

  const renderRightControls = () => [
    <CartAction onPress={() => navigation.navigate('Cart')} />,
    <Text>{Cart.cart ? Cart.cart.length : 0}</Text>,
    // <MenuAction/>,
  ];

  // const themeContext = React.useContext(ThemeContext);

  // const themee = useTheme();

  return (
    <View>
      {/* <StatusBar backgroundColor={ themee["color-basic-800"] } barStyle={themeContext.theme == "light" ? "dark-content" : "light-content"} /> */}

      <TopNavigation
        style={{paddingRight: 30}}
        title={heading}
        leftControl={renderLeftControl()}
        rightControls={renderRightControls(Cart)}
      />
    </View>
  );
};
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    Cart: state.Cart,
  };
};
export default connect(mapStateToProps)(HeaderC);
