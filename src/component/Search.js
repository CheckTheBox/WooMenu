import React, {useState} from 'react';
import {View} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Input, Icon} from '@ui-kitten/components';

function SearchC(props) {
  const [search, setsearch] = useState('');
  const [visible, setvisible] = useState('');
  const updateSearch = searchh => {
    setsearch(searchh);
  };

  const onsub = e => {
    if (props.self == true) {
      props.return(search);
    } else {
      props.navigation.navigate('Search', {input: search});
    }
  };

  return (
    <View>
      {/* <SearchQuery/> */}
      <Input
        style={{
          paddingLeft: 15,
          paddingRight: 25,
          paddingTop: 30,
          paddingBottom: 20,
        }}
        onSubmitEditing={onsub}
        icon={style => <Icon {...style} name={'search-outline'} />}
        placeholder="Поищем?"
        onChangeText={e => updateSearch(e)}
        value={search}
        platform={'android'}
      />
    </View>
  );
}

export default withNavigation(SearchC);
