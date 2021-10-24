import React, {useState} from 'react';
import {View, Image, ScrollView, ActivityIndicator} from 'react-native';
import striptags from 'striptags';
import {connect} from 'react-redux';
import {Text, Input, Icon, useTheme} from '@ui-kitten/components';

const CheckoutCard = ({data, ind, index, dispatch}) => {
  const [state, setstate] = useState(true);

  return (
    <View
      style={{
        height: 180,
        borderTopWidth: 0.1,
        borderBottomWidth: 0.1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
        paddingLeft: 10,
        paddingRight: 15,
      }}>
      <View>
        <Image
          source={{uri: data[1].image.sourceUrl}}
          style={{width: 180, height: 180}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flex: 1, margin: 10}}>
          <ScrollView>
            <Text
              style={{
                marginLeft: 15,
                paddingTop: 5,
                fontSize: 24,
                fontFamily: 'Montserrat-Light',
                height: 30,
              }}>
              {data[1].name}
            </Text>
            <Text
              style={{
                marginLeft: 15,
                height: 72,
                fontSize: 18,
                fontFamily: 'Montserrat-Light',
              }}>
              {striptags(data[1].description.substring(0, 100) + '...')}
            </Text>
          </ScrollView>
        </View>
        <View style={{height: 45, flexDirection: 'row'}}>
          <Input
            containerStyle={{width: 45}}
            style={{marginLeft: 22}}
            value={'' + ind.Q}
          />
          <Text style={{top: 5, left: 10, fontFamily: 'Montserrat-Light'}} />
          <View style={{flexDirection: 'row-reverse', flex: 1}}>
            <Text
              style={{
                paddingTop: 5,
                fontSize: 24,
                top: 5,
                left: 10,
                fontFamily: 'Montserrat-Light',
              }}>
              {parseInt(ind.Q) +
                ' x ' +
                parseInt(data[1].price.replace(' ', '')) +
                '   =   '}
              {parseInt(data[1].price.replace(' ', '')) * parseInt(ind.Q)}
            </Text>
          </View>
        </View>
      </View>
      <Icon
        width={32}
        height={32}
        name={'close-circle-outline'}
        style={{position: 'absolute', top: 0, right: 4}}
        onPress={() => {
          setstate(false);
          dispatch({type: 'CART_DELETE', product: index});
        }}
      />
    </View>
  );
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    Cart: state.Cart.cart,
  };
};
export default connect(mapStateToProps)(CheckoutCard);
