import React from 'react';
import AppNavigator from './navigator/stack';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Provider} from 'react-redux';
import {StatusBar, PlatformColor, Appearance} from 'react-native';
import store from './Redux/Store';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
// import {persistCache} from 'apollo-cache-persist';
import {
  ApplicationProvider,
  IconRegistry,
  useTheme,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping} from '@eva-design/eva';
import {dark, light} from './custom-theme'; // <-- Import app theme
import {ThemeContext} from './theme-context';
import realm from '../realm';
import uuid from "react-native-uuid";

const themes = {dark, light};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [],
    },
  },
});
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  fragmentMatcher,
});

// persistCache({
//   cache,
//   storage: AsyncStorage,
// });


// realm.write(() => {
//   realm.create('Server', {
//     id: uuid.v4(),
//     address: '185.230.205.140',
//     username: 'admin',
//     password: 'Adm8n0ass',
//   });
// });
let uri, address;
try {
  address = realm.objects('Server').filtered('active == true')[0].address
  console.warn(realm.objects('Server'));
  if (address !== undefined) {
    uri = address;
  }
} catch (e) {
  console.warn(e);
}

const client = new ApolloClient({
  // uri: 'http://185.230.205.140/graphql',
  uri: uri,
  cache,
});

const App = () => {
  // const [theme, setTheme] = React.useState(Appearance.getColorScheme());
  console.reportErrorsAsExceptions = false;
  const [theme, setTheme] = React.useState('dark');
  const currentTheme = themes[theme];

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  const themee = useTheme();

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider mapping={mapping} theme={currentTheme}>
          <StatusBar
            backgroundColor={
              theme == 'light' ? 'white' : currentTheme['color-basic-800']
            }
            barStyle={theme == 'light' ? 'dark-content' : 'light-content'}
          />

          <Provider store={store}>
            {/* Apollo for graphQL */}
            <ApolloProvider client={client}>
              {/* App Navigation  */}
              <NavigationContainer ref={navigationRef}>
                <AppNavigator />
              </NavigationContainer>
            </ApolloProvider>
          </Provider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </React.Fragment>
  );
};

export default App;
