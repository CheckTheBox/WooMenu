import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, FlatList} from 'react-native';
import {HeaderC} from '../../../component/index';
import {Category} from '../../../component/Categories';
import {Banner, BannerCarousel} from '../../../component/Banner';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {Layout} from '@ui-kitten/components';
import axios from 'axios';

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
  }
  _renderCategory = ({item, index}) => {
    return <Category navigation={this.props.navigation} data={item} />;
  };
  style = StyleSheet.create({
    ViewStyle: {
      flex: 1,
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
        </View>
        <ScrollView>
          <View style={{padding: 20}}>
            <BannerCarousel />
          </View>
          <FlatList
            style={{
              padding: 10,
              width: '100%',
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
