import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, FlatList} from 'react-native';
import {HeaderC, SearchC, ICard, TCarC, CarC} from '../../../component/index';

import AsyncStorage from '@react-native-community/async-storage';
import GetCat from './GraphQLComponent/Cat.js';
import GetPop from './GraphQLComponent/products.js';
import {connect} from 'react-redux';
import {Layout, Text} from '@ui-kitten/components';
import axios from 'axios';
import {categories1} from '../../../Graphql/Actions';

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

  updateSearch = search => {
    this.setState({search});
  };
  componentDidMount() {
    axios({
      url: 'http://menu-kaizen.checkthebox.uz/graphql',
      method: 'post',
      data: {
        query: categories1,
      },
    })
      .then(result => {
        this.setState({entries: result.data.data.productCategories.nodes});
      })
      .catch(err => {});
  }
  _renderItem = ({item, index}) => {
    return (
      <CarC
        navigation={this.props.navigation}
        data={item}
        onPress={() => this.props.navigation.navigate('Details')}
      />
    );
  };
  _renderItem1({item, index}) {
    return <ICard data={{item, index}} />;
  }
  style = StyleSheet.create({
    ViewStyle: {
      flex: 1,
      paddingLeft: 15,
      alignSelf: 'center',
      // backgroundColor: '#1b3022',
    },
  });

  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <Layout style={this.style.ViewStyle}>
        <View style={{paddingBottom: 20}}>
          <HeaderC navigation={this.props.navigation} />
          <SearchC />
        </View>
        <ScrollView>
          <View style={{marginTop: 20}}>
            <GetPop
              navigation={this.props.navigation}
              orderby={0}
              render={this._renderItem1}
            />
          </View>
          <FlatList
            data={this.state.entries}
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
