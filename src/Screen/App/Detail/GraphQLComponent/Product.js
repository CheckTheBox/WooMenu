import React from 'react';
import {
  View,
  Dimensions,
  FlatList,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {productsSorted} from '../../../../Graphql/Actions/index';
import {Text} from '@ui-kitten/components';

const GetProducts = props => {
  const dataa = OrderBY(props.orderby);
  const {data, loading, error} = useQuery(productsSorted(dataa.filter));
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
            {dataa.title}
          </Text>
        </View>

        <View style={{flexDirection: 'row-reverse'}}>
          <Text
            status="danger"
            style={{
              fontSize: 13,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            filter
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
      // eslint-disable-next-line no-unreachable
      break;
    default:
      return {title: 'Все меню 🎉', filter: '{field: PARENT,order: DESC }'};
      // eslint-disable-next-line no-unreachable
      break;
  }
}
export default GetProducts;
