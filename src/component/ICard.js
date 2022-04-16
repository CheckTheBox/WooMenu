import React from 'react';
import {StyleSheet, Dimensions, Image} from 'react-native';
import striptags from 'striptags';
import {withNavigation} from '@react-navigation/compat';
import {Card, Text, Button} from '@ui-kitten/components';

export const CustomHeader = ({item}) => {
  let image;
  let name;
  if (item !== undefined) {
    if (item.item.image !== null) {
      image = item.item.image;
    } else {
      image = '';
    }
    name = item.item.name;
  }
  return (
    <React.Fragment>
      <Image style={styles.headerImage} source={{uri: image}} />
      <Text style={styles.headerText} category="h6">
        {name}
      </Text>
    </React.Fragment>
  );
};

export const Footer = ({item, onPress}) => {
  return (
    <React.Fragment>
      <Button
        onPress={onPress}
        style={{
          flex: 1,
          backgroundColor: 'rgba(214,64,69,0.9)',
          borderColor: 'rgba(44,44,44,0.6)',
        }}
        textStyle={{
          fontWeight: 'normal',
          fontFamily: 'Montserrat-Regular',
          fontSize: 24,
          lineHeight: 24,
        }}>
        {String(item.item.price)
          .replace('&nbsp;', ' ')
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
      </Button>
    </React.Fragment>
  );
};

function ICard(props) {
  const item = props.data.item;
  let width = Dimensions.get('screen').width;
  return (
    <Card
      onPress={() =>
        props.navigation.navigate('Single', {
          item: item,
        })
      }
      status={'info'}
      style={{
        padding: 0,
        borderWidth: 1,
        borderColor: 'rgba(44,44,44,0.9)',
        margin: 10,
        width: width / 2 - 32,
      }}
      header={() => <CustomHeader item={props.data} />}
      footer={() => (
        <Footer
          onPress={() =>
            props.navigation.navigate('Single', {
              item: item,
            })
          }
          item={props.data}
        />
      )}>
      {/*{about}*/}
    </Card>
  );
}

const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 10,
    marginVertical: 10,
    // color: 'white',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'normal',
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
  },
  headerImage: {
    flex: 1,
    height: 240,
  },
});

export default withNavigation(ICard);
