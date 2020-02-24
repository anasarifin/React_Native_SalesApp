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
  Button,
} from 'react-native';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      warning: false,
      disabled: true,
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
    const regex = /[a-z0-9]+/gi;
    // console.log(regex.test(this.state.username));
    if (this.state.username) {
      console.log('username ok');
      if (this.state.password) {
        console.log('password ok');
        if (this.state.password === this.state.rePassword) {
          console.log('re password ok');
        } else {
          this.setState({
            warning: 'Re-password must same!',
          });
        }
      } else {
        this.setState({
          warning: 'Password is not valid!',
        });
      }
    } else {
      this.setState({
        warning: 'Username is not valid!',
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="rgba(0,0,0,.3)" />
        <View style={styles.logoCon}>
          {/* <Image
            source={require('../images/bar-logo.png')}
            style={styles.logo}
          /> */}
          <Text>Sushi-Bar Cashier App</Text>
        </View>
        <View style={styles.textCon}>
          <TextInput style={styles.warning}>{this.state.warning}</TextInput>

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
});
