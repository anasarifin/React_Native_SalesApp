import React from 'react';
import {View, Text, BackHandler, Alert, Modal, StyleSheet} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import Axios from 'axios';
import {Button} from 'react-native-elements';

const url = 'http://100.24.32.116:9999/api/v1/products';

export default class CheckButton extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      totalPage: 1,
      currentPage: 1,
    };
  }

  getPagination() {
    Axios.get(url).then(resolve => {
      this.setState({
        totalPage: Math.ceil(resolve.data.length / 8),
      });
    });
  }

  changePage(x) {}

  render() {
    const page = [];
    for (let x = 1; x <= this.state.totalPage; x++) {
      page.push(
        <Text key={x} onPress={this.changePage(x)} style={styles.page}>
          {x}
        </Text>,
      );
    }

    this.getPagination();
    return (
      <View style={styles.container}>
        <Button
          title="Checkout"
          containerStyle={styles.buttonCon}
          buttonStyle={styles.button}
        />
        <Button
          title="Cancel"
          containerStyle={styles.buttonCon}
          buttonStyle={styles.buttonRed}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '95%',
  },
  buttonRed: {
    width: '95%',
    backgroundColor: 'red',
  },
  buttonCon: {
    alignItems: 'center',
    marginBottom: 10,
  },
});
