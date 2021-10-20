import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {HeaderC, SearchC, ICard, TCarC, CarC} from '../../../component/index';
import {CarC2} from '../../../component/Categories';
import * as RootNavigation from '../../../RootNavigation';

import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {Layout, Text} from '@ui-kitten/components';
import axios from 'axios';
import {categories1, parentCategories} from '../../../Graphql/Actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      user: '',
      entries: [],
    };
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({user: JSON.parse(userToken)});
  };

  // updateSearch = search => {
  //   this.setState({search});
  // };
  componentDidMount() {
    axios({
      url: 'http://185.230.205.140/graphql',
      method: 'post',
      data: {
        query: parentCategories,
      },
    })
      .then(result => {
        this.setState({
          parentCategories: result.data.data.productCategories.nodes,
        });
      })
      .catch(err => {});
    axios({
      url: 'http://185.230.205.140/graphql',
      method: 'post',
      data: {
        query: categories1,
      },
    })
      .then(result => {
        this.setState({categories: result.data.data.productCategories.nodes});
      })
      .catch(err => {});
  }
  _renderItem = ({item, index}) => {
    // console.error(item);
    return <CarC2 navigation={this.props.navigation} data={item} />;
  };
  style = StyleSheet.create({
    ViewStyle: {
      flex: 1,
      paddingLeft: 15,
      alignSelf: 'center',
    },
  });
  render() {
    return (
      <Layout style={this.style.ViewStyle}>
        <View style={{paddingTop: 20}}>
          <HeaderC
            navigation={this.props.navigation}
            current_menu={'main_menu'}
          />
          <SearchC />
          <Image
            style={{
              flex: 0,
              margin: 15,
              marginRight: 15,
            }}
            source={require('../../../static/header_banner.png')}
            height={300}
            width={'96%'}
          />
        </View>
        <ScrollView>
          <FlatList
            style={{paddingTop: 20, width: Dimensions.get('screen').width}}
            data={this.state.parentCategories}
            renderItem={this._renderItem}
            numColumns={2}
          />
        </ScrollView>
      </Layout>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(Home);
