import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const url = 'http://100.24.32.116:9999/api/v1/login';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      warning: false,
      loading: false,
    };
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    this.setState({
      loading: true,
    });
    // console.log(this.state.username);
    // console.log(this.state.password);
    Axios.post(url, {
      username: this.state.username,
      password: this.state.password,
    }).then(resolve => {
      if (resolve.data.token) {
        AsyncStorage.setItem('token', resolve.data.token);
        this.props.navigation.dispatch(StackActions.replace('main'));
      } else {
        this.setState({loading: false, warning: resolve.data.warning});
      }
    });
  }

  setUsername(value) {
    this.setState({
      username: value,
    });
  }

  setPassword(value) {
    this.setState({
      password: value,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="rgba(0,0,0,.3)" translucent={true} />
        <View style={styles.logoCon}>
          <Image
            source={require('../images/bar-logo.png')}
            style={styles.logo}
          />
          <Text>Sushi-Bar Cashier App</Text>
        </View>
        <View style={styles.textCon}>
          <TextInput style={styles.warning}>{this.state.warning}</TextInput>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="rgba(0,0,0,.5)"
            autoCapitalize="none"
            onChange={e => this.setState({username: e.nativeEvent.text})}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="rgba(0,0,0,.5)"
            onChange={e => this.setState({password: e.nativeEvent.text})}
          />
          <TouchableOpacity>
            <Text style={styles.loginButton} onPress={this.login}>
              Login
            </Text>
          </TouchableOpacity>
          <ActivityIndicator
            style={this.state.loading ? styles.loadingOn : styles.loading}
            color="#ff5722"
            size="large"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text
              style={styles.registerButton}
              onPress={() => this.props.navigation.navigate('register')}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03a9f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCon: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCon: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -200,
    zIndex: 1,
  },
  logo: {
    width: 170,
    height: 170,
    marginRight: -12,
  },
  inputText: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,.5)',
    width: 350,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  loginButton: {
    borderRadius: 20,
    backgroundColor: '#ff5722',
    width: 350,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 45,
    height: 45,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  footerText: {
    fontSize: 20,
  },
  warning: {
    marginTop: -40,
    fontSize: 18,
    color: 'red',
  },
  registerButton: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    position: 'absolute',
    bottom: 50,
    opacity: 0,
  },
  loadingOn: {
    position: 'absolute',
    bottom: 50,
    opacity: 1,
  },
});
