import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {HeaderC} from '../../../component/index';

import {connect} from 'react-redux';
import GetProduct from './GraphQLComponent/Product';
import {Layout, Text, useTheme, Icon, Button} from '@ui-kitten/components';

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: 1,
      loading: false,
      item: props.route.params.item,
    };
  }

  FooterBtn = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          style={{flex: 1}}
          onPress={() => {
            this.setState({loading: true});
            this.props.dispatch({
              type: 'CART_ADD',
              product: {
                Q: this.state.q,

                id: this.props.route.params?.id ?? null,
                Pid: this.props.route.params?.product ?? null,
              },
            });
            this.setState({loading: false});
          }}>
          Добавить в корзину
        </Button>
      </View>
    );
  };

  onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width,
    });
  };
  style = StyleSheet.create({
    ViewStyle: {
      flex: 1,
      paddingTop: 20,
      // backgroundColor: '#1b3022',
    },
    TextStyle: {
      fontSize: 30,
      fontFamily: 'Montserrat-Bold',
    },
  });

  Footer = () => {
    const theme = useTheme();
    const FooterBtn = this.FooterBtn();

    return (
      <View
        style={{
          height: 40,
          borderTopRightRadius: 30,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          <Icon
            style={{margin: 10}}
            width={30}
            height={30}
            name="plus-circle-outline"
            fill={theme['color-primary-800']}
            size={12}
            onPress={() => this.setState({q: this.state.q + 1})}
          />
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.q}</Text>
          <Icon
            style={{margin: 10}}
            name="minus-circle-outline"
            fill={theme['color-primary-800']}
            width={30}
            height={30}
            onPress={() => this.setState({q: this.state.q - 1})}
          />
        </View>
        {FooterBtn}
      </View>
    );
  };

  render() {
    return (
      <Layout style={this.style.ViewStyle}>
        <View style={{paddingBottom: 20}}>
          <HeaderC navigation={this.props.navigation} />
        </View>
        <ScrollView style={{flex: 1}}>
          <GetProduct item={this.state.item} />
        </ScrollView>
        <this.Footer />
      </Layout>
    );
  }
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {};
};

export default connect(mapStateToProps)(Single);
