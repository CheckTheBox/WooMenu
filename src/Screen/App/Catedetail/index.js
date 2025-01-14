import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';
import GetProducts from './GraphQLComponent/Product';
import {HeaderC, SearchC, ICard} from '../../../component/index';
import {Layout, Text, useTheme} from '@ui-kitten/components';

function Item(data, index, state) {
  const theme = useTheme();

  const datas = data.data;
  return (
    <TouchableOpacity
      onPress={() => data.update(data.data.text, data.index)}
      key={index}>
      <View
        style={{
          backgroundColor: theme['color-primary-default'],
          borderColor: theme['color-primary-900'],
          paddingTop: 7,
          paddingBottom: 7,
          paddingLeft: 16,
          paddingRight: 16,
          marginRight: 7,
          borderWidth: 1,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            paddingRight: 7,
            fontSize: 12,
            fontWeight: 'bold',
          }}>
          {data.data.text.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

class CatDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      cart: true,
      data: props.route.params?.data ?? null,
    };
    // this.setState({data: this.props.navigation.getParam('data', null)});
  }
  componentDidMount() {
    const cate = [];

    this.state.data.children.nodes.forEach((e, i) => {
      if (i === 0) {
        this.setState({where: e.name});
        cate.push({
          text: e.name,
        });
      } else {
        cate.push({
          text: e.name,
        });
      }
    });
    this.setState({cate});
  }
  updateSearch = search => {
    this.setState({search});
  };
  _renderItem({item, index}) {
    return <ICard key={Math.random()} data={{item, index}} />;
  }
  update = (name, index) => {
    this.setState({where: name});
    const cate = [];
    this.state.data.children.nodes.forEach((e, i) => {
      if (i === index) {
        this.setState({where: e.name});
        cate.push({
          text: e.name,
        });
      } else {
        cate.push({
          text: e.name,
        });
      }
    });
    this.setState({cate});
  };
  style = StyleSheet.create({
    ViewStyle: {
      flex: 1,
    },
  });
  abc: any;
  set_a() {
    if (this.state.where !== undefined) {
      this.abc = this.state.where;
    } else {
      this.abc = this.state.data.name;
    }
    return this.abc;
  }
  render() {
    return (
      <Layout style={this.style.ViewStyle}>
        <View style={{paddingTop: 20}}>
          <HeaderC navigation={this.props.navigation} />
          <SearchC />
        </View>
        <ScrollView
          style={{
            flex: 1,
            alignSelf: 'center',
            // marginLeft: 5,
            paddingTop: 20,
            paddingLeft: 0,
            paddingRight: 0,
          }}>
          <GetProducts
            title={this.state.data.name.toUpperCase()}
            orderby={this.set_a()}
            render={this._renderItem}
          />
        </ScrollView>
      </Layout>
    );
  }
}

export default CatDetail;
