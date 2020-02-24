import React from 'react';
import {View, Text, BackHandler, Alert, Modal, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Axios from 'axios';

const url = 'http://100.24.32.116:9999/api/v1/products';

export default class Pagination extends React.Component {
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

  changePage(x) {
    console.log(x);
  }

  render() {
    const page = [];
    for (let x = 1; x <= this.state.totalPage; x++) {
      page.push(
        <Text onPress={this.changePage(x)} style={styles.page}>
          {x}
        </Text>,
      );
    }

    this.getPagination();
    return (
      <View style={styles.container}>
        <Text style={styles.page}>{'<'}</Text>
        {page}
        <Text style={styles.page}>{'>'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  page: {
    marginHorizontal: 20,
    fontSize: 30,
  },
});
