import React, {Component} from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {productsByCategories} from '../../../../Graphql/Actions/index';
import {Text} from '@ui-kitten/components';

const GetProducts = props => {
  var {height, width} = Dimensions.get('window');
  const {data, loading, error} = useQuery(productsByCategories(props.orderby));
  if (loading) {
    return <View />;
  }
  if (error) {
    return <Text>ERROR</Text>;
  }
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
      <FlatList
        data={data.products.nodes}
        renderItem={props.render}
        numColumns={2}
      />
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
