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
  ToastAndroid,
} from 'react-native';
import Axios from 'axios';

const url = 'http://100.24.32.116:9999/api/v1/register';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      warning: false,
      disabled: true,
      loading: false,
    };
    this.checkUsername = this.checkUsername.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkRePassword = this.checkRePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  checkUsername(value) {
    this.setState({
      username: value,
    });
    // const regex = /[a-z0-9]+/gi;
    // if (regex.test(value)) {
    //   this.setState({
    //     username: value,
    //   });
    // } else {
    //   this.setState({
    //     warning: 'Username is not valid!',
    //   });
    // }
  }

  checkPassword(value) {
    this.setState({
      password: value,
    });
    // const regex = /[a-z0-9]+/gi;
    // if (regex.test(value)) {
    //   this.setState({
    //     password: value,
    //   });
    //   if (value === this.state.rePasswordV) {
    //     this.setState({
    //       warning: false,
    //     });
    //   } else {
    //     if (this.state.rePasswordV) {
    //       this.setState({
    //         warning: 'Re-type password must same!',
    //       });
    //     }
    //   }
    // } else {
    //   if (!this.state.warning) {
    //     this.setState({
    //       warning: 'Password is not valid!',
    //     });
    //   }
    // }
  }

  checkRePassword(value) {
    this.setState({
      rePassword: value,
    });
    // if (value !== this.state.password) {
    //   if (!this.state.warning) {
    //     this.setState({
    //       warning: 'Re-type password must same!',
    //     });
    //   }
    // } else {
    //   this.setState({
    //     warning: false,
    //     rePassword: true,
    //     disabled: false,
    //   });
    // }
  }

  //   checkButton() {
  //     if (this.state.rePassword) {
  //       this.setState({
  //           validity: false
  //       })
  //     } else {
  //       return true;
  //     }
  //   }

  submit() {
    const regex = /[a-z0-9]/gi;
    const username = this.state.username;
    const password = this.state.password;
    // console.log(regex.test(this.state.username));
    if (
      username &&
      username.length >= 4 &&
      username.length <= 12 &&
      regex.test(username)
    ) {
      if (password && password.length >= 6 && regex.test(password)) {
        if (this.state.password === this.state.rePassword) {
          this.setState({
            loading: true,
            warning: null,
          });
          Axios.post(url, {username: username, password: password})
            .then(resolve => {
              this.setState({
                loading: false,
              });
              if (resolve.data.insertId) {
                ToastAndroid.show('Register success!', ToastAndroid.SHORT);
                this.props.navigation.navigate('login');
              } else if (resolve.data.warning) {
                this.setState({
                  warning: resolve.data.warning,
                });
              }
            })
            .catch(reject => console.log(reject));
        } else {
          this.setState({
            warning: 'Re-type password must same!',
          });
        }
      } else {
        this.setState({
          warning:
            'Password must contain min 6 character and not include special char!',
        });
      }
    } else {
      this.setState({
        warning:
          'Username must contain 4 - 12 character and not include special char!',
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="rgba(0,0,0,.3)" />
        <View style={styles.logoCon}>
          <Image
            source={require('../images/bar-logo.png')}
            style={styles.logo}
          />
          <Text>Sushi-Bar Cashier App</Text>
        </View>
        <View style={styles.textCon}>
          <Text style={styles.warning}>{this.state.warning}</Text>

          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="rgba(0,0,0,.5)"
            onChange={e => this.checkUsername(e.nativeEvent.text)}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="rgba(0,0,0,.5)"
            onChange={e => this.checkPassword(e.nativeEvent.text)}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Re-type Password"
            secureTextEntry={true}
            placeholderTextColor="rgba(0,0,0,.5)"
            onChange={e => this.checkRePassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={this.submit}>
            <Text style={styles.loginButton}>Register</Text>
          </TouchableOpacity>
          <ActivityIndicator
            style={this.state.loading ? styles.loadingOn : styles.loading}
            color="rgba(30,90,255,.7)"
            size="large"
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity>
            <Text
              style={styles.registerButton}
              onPress={() => this.props.navigation.navigate('login')}>
              Login
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
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCon: {
    marginTop: -60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCon: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -200,
  },
  logo: {
    width: 170,
    height: 170,
    marginTop: -100,
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
    backgroundColor: 'rgba(30,90,255,.7)',
    width: 350,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 45,
    height: 45,
    color: 'white',
  },
  warning: {
    marginTop: -40,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    width: 380,
    marginBottom: 10,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  footerText: {
    fontSize: 20,
  },
  registerButton: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    position: 'absolute',
    bottom: 40,
    opacity: 0,
  },
  loadingOn: {
    position: 'absolute',
    bottom: 40,
    opacity: 1,
  },
});
