import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import GetProducts from './GraphQLComponent/Product';
import {HeaderC, ICard} from '../../../component/index';
import {Layout} from '@ui-kitten/components';

class CategoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: true,
      data: props.route.params?.data ?? null,
    };
  }
  componentDidMount() {
    const cate = [];

    this.state.data.data.products.forEach((e, i) => {
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
  _renderItem({item, index}) {
    return <ICard key={item.id} data={{item, index}} />;
  }
  update = (name, index) => {
    this.setState({where: name});
    const cate = [];
    this.state.data.data.products.forEach((e, i) => {
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
      this.abc = this.state.data.data.category.name;
    }
    return this.abc;
  }
  render() {
    return (
      <Layout style={this.style.ViewStyle}>
        <View style={{paddingTop: 20}}>
          <HeaderC navigation={this.props.navigation} />
        </View>
        <ScrollView
          style={{
            flex: 1,
            alignSelf: 'center',
          }}>
          <GetProducts
            title={this.state.data.data.category.name.toUpperCase()}
            products={this.state.data.data.products}
            render={this._renderItem}
          />
        </ScrollView>
      </Layout>
    );
  }
}

export {CategoryDetail};
