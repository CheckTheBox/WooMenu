import React from 'react';
import {View, FlatList} from 'react-native';
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
export default GetProducts;
