import React, {Component} from 'react';
import Carousel from 'react-native-snap-carousel';
import {Dimensions, ActivityIndicator, View, Text} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import colors from '../../../../colors.json';
const GET_P = orderby => gql`
{
  products(first: 15, where:{orderby:${orderby}}){
    nodes {
      id
      name
      description
      ... on SimpleProduct{
        price
      }
      ... on VariableProduct{
        price
      }
      ... on ExternalProduct{
        price
      }
      image{
        sourceUrl
      }

    }
  }
}
`;

const GetPop = props => {
  var {height, width} = Dimensions.get('window');
  const params = OrderBY(props.orderby);
  const {data, loading, error} = useQuery(GET_P(params.filter));
  if (loading) {
    return <ActivityIndicator size="large" color={colors.color} />;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  return (
    <View style={{marginLeft: 20, marginRight: 20}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: colors.color,
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {params.title}
          </Text>
        </View>

        <View style={{flexDirection: 'row-reverse'}}>
          <Text
            style={{
              color: colors.themeC,
              fontSize: 13,
              fontFamily: 'Montserrat-SemiBold',
            }}
            onPress={() =>
              props.navigation.navigate('Detail', {orderby: props.orderby})
            }>
            больше
          </Text>
        </View>
      </View>
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={data.products.nodes}
        renderItem={props.render}
        sliderWidth={width}
        itemWidth={200}
        activeSlideAlignment={'start'}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
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
export default GetPop;
