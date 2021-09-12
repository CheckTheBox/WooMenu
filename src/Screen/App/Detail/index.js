import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Text,
  Animated,
} from 'react-native';
import {HeaderC, SearchC, ICard} from '../../../component/index';
import GetProducts from './GraphQLComponent/Product.js';
import {Layout} from '@ui-kitten/components';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      cart: true,
      entries: [1, 2, 3, 4, 5, 6, 7],
    };
  }
  updateSearch = search => {
    this.setState({search});
  };
  _renderItem({item, index}) {
    return <ICard data={{item, index}} />;
  }
  style = StyleSheet.create({
    ViewStyle: {
      flex: 1,
    },
  });
  render() {
    return <Layout style={this.style.ViewStyle} />;
  }
}
export default Detail;
