import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {HeaderC, SearchC} from '../../../component/index';
import {Category} from '../../../component/Categories';

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
      banner_url: null,
    };
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({user: JSON.parse(userToken)});
  };

  componentDidMount() {
    axios({
      url: 'https://kaizen.woomenu.uz/graphql',
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
      url: 'https://admin.kaizen-sushi.uz/api/get_menu',
      method: 'get',
    })
      .then(result => {
        this.setState({
          categories: result.data.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
    // axios({
    //   url: 'https://kaizen.woomenu.uz/graphql',
    //   method: 'post',
    //   data: {
    //     query: categories1,
    //   },
    // })
    //   .then(result => {
    //     this.setState({categories: result.data.data.productCategories.nodes});
    //   })
    //   .catch(err => {});
    axios({
      url: 'https://admin.kaizen-sushi.uz/api/get_slides',
      method: 'get',
    })
      .then(result => {
        let banners_count = result.data.slides.length;
        let index = Math.random() * (banners_count - 1);
        this.setState({banner_url: result.data.slides[Math.floor(index)].url});
      })
      .catch(error => {
        console.log(error);
      });
  }
  _renderCategory = ({item, index}) => {
    return <Category navigation={this.props.navigation} data={item} />;
  };
  style = StyleSheet.create({
    ViewStyle: {
      flex: 1,
      paddingLeft: 5,
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
          <Image
            style={{
              flex: 0,
              marginLeft: 15,
              marginRight: 30,
              width: '95%',
              height: 300,
            }}
            // source={require('../../../static/header_banner.png')}
            source={{
              uri: this.state.banner_url,
            }}
          />
          <SearchC />
        </View>
        {/*<ScrollView>*/}
        {/*  <FlatList*/}
        {/*    style={{*/}
        {/*      paddingTop: 20,*/}
        {/*      width: Dimensions.get('screen').width,*/}
        {/*      paddingLeft: 11,*/}
        {/*      paddingRight: 15,*/}
        {/*    }}*/}
        {/*    data={this.state.parentCategories}*/}
        {/*    renderItem={this._renderItem}*/}
        {/*    numColumns={2}*/}
        {/*  />*/}
        {/*</ScrollView>*/}
        <ScrollView>
          <FlatList
            style={{
              paddingTop: 20,
              width: Dimensions.get('screen').width,
              paddingLeft: 11,
              paddingRight: 15,
            }}
            data={this.state.categories}
            renderItem={this._renderCategory}
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
