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
    <View style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {props.title}
          </Text>
        </View>

        <View style={{flexDirection: 'row-reverse'}}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            фильтр
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
