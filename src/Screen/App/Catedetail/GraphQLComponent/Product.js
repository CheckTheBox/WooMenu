import React, {Component} from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {Text} from '@ui-kitten/components';

const GetProducts = props => {
  const products = props.products;
  return (
    <View style={{marginTop: 10, alignSelf: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {props.title}
          </Text>
        </View>
      </View>
      <FlatList data={products} renderItem={props.render} numColumns={2} />
    </View>
  );
};
function OrderBY(order) {
  switch (order) {
    case 0:
      return {title: 'Все меню 🎉', filter: '{field: PARENT,order: DESC }'};
      break;
    default:
      return {title: 'Все меню 🎉', filter: '{field: PARENT,order: DESC }'};
      break;
  }
}
export default GetProducts;
