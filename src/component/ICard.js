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
      <Button onPress={onPress} style={{flex: 1}}>
        {/*Подробнее*/}
        {String(item.item.price)}
      </Button>
    </React.Fragment>
  );
};

function ICard(props) {
  const {item} = props.data.item;
  let about;
  if (item !== undefined) {
    if (item.about !== null) {
      about = <Text>{striptags(item.about.substring(0, 50)) + '...'}</Text>;
    } else {
      about = <Text>{striptags(item.name.substring(0, 50)) + '...'}</Text>;
    }
  }
  let a = Dimensions.get('screen').width;
  return (
    <Card
      onPress={() =>
        props.navigation.navigate('Single', {
          id: item.id,
          product: item.productId,
        })
      }
      status={'info'}
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: '#C6C8CE80',
        margin: 4,
        marginTop: 20,
        width: a / 2 - 26,
        elevation: 14,
      }}
      header={() => <CustomHeader item={props.data} />}
      footer={() => (
        <Footer
          onPress={() =>
            props.navigation.navigate('Single', {
              id: item.id,
              product: item.productId,
            })
          }
          item={props.data}
        />
      )}>
      {about}
    </Card>
  );
}

const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 10,
    marginVertical: 16,
  },
  headerImage: {
    flex: 1,
    height: 192,
  },
});

export default withNavigation(ICard);
