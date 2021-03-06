/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {BackHandler, ToastAndroid, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Main from './src/screens/Main';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const Stack = createStackNavigator();

class AppWithRedux extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
    };
  }
  checkLogin = async () => {
    const login = await AsyncStorage.getItem('token');
    if (login) {
      this.setState({
        login: true,
      });
    }
    this.setState({
      complete: true,
    });
  };

  componentDidMount() {
    this.checkLogin();
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.complete ? (
          <Stack.Navigator
            initialRouteName={this.state.login ? 'main' : 'login'}
            headerMode="none">
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen
              name="main"
              component={Main}
              options={{gestureEnabled: false}}
            />
          </Stack.Navigator>
        ) : (
          <StatusBar />
        )}
      </NavigationContainer>
    );
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  );
};

export default App;

// import React from 'react';
// import Login from './src/screens/Login';
// import Register from './src/screens/Register';
// import Main from './src/screens/Main';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// class Main extends React.Component {
//   render() {
//     return <StatusBar barStyle="light-content" />;
//   }
// }

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// class App extends React.Component {
//   render() {
//     return <Register />;
//   }
// }

// export default App;
