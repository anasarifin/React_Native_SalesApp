import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class Logout extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
    this.cancel = this.cancel.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }
  logoutUser() {
    AsyncStorage.removeItem('token');
    this.props.navigation.navigate('login');
  }
  cancel() {
    this.setState({
      show: false,
    });
    this.props.navigation.navigate('Home');
  }

  reset() {
    this.setState({
      show: true,
    });
  }

  //   componentDidUpdate() {
  //     this.reset();
  //   }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Are you want to logout?</Text>
        <View style={styles.allButtonCon}>
          <Button
            title="No"
            containerStyle={styles.button}
            onPress={this.cancel}
          />
          <Button
            title="Yes"
            containerStyle={styles.button}
            onPress={this.logoutUser}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    marginBottom: 50,
  },
  allButtonCon: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 16,
    width: 100,
  },
});
