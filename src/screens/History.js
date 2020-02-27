import React from 'react';
import Axios from 'axios';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from '@react-navigation/native';

const url = 'http://192.168.42.142:9999/api/v1/products';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: 8,
          name: 'Anago',
          description: 'Eel Sushi',
          price: 10000,
          stock: 97,
          image:
            'http://localhost:9999/public/img/2020-02-19T15-16-25.516Zanago.jpg',
          category_id: 0,
          updated_at: '2020-02-19T15:16:25.000Z',
          created_at: '2020-02-04T13:13:14.000Z',
        },
        {
          id: 36,
          name: 'Karaage',
          description: 'Fried Chicken',
          price: 50000,
          stock: 100,
          image:
            'http://localhost:9999/public/img/2020-02-20T06-36-37.412Zkaraage.jpg',
          category_id: 0,
          updated_at: '2020-02-20T06:36:37.000Z',
          created_at: '2020-02-20T06:36:37.000Z',
        },
      ],
      fetchComplete: false,
    };
    this.toRupiah = this.toRupiah.bind(this);
  }
  getData() {
    // fetch(url)
    //   .then(response => response.json())
    //   .then(resolve => {
    //     this.setState({
    //       data: resolve,
    //     });
    //   })
    //   .catch(err => console.warn(err));
    Axios.get(url)
      .then(resolve => {
        this.setState({
          data: resolve.data,
          fetchComplete: true,
        });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  toRupiah(number) {
    let number_string = number.toString();
    let leftover = number_string.length % 3;
    let rupiah = number_string.substr(0, leftover);
    let thousand = number_string.substr(leftover).match(/\d{3}/g);
    if (thousand) {
      let separator = leftover ? '.' : '';
      rupiah += separator + thousand.join('.');
    }
    return rupiah;
  }

  // logout() {
  //   AsyncStorage.removeItem('token');
  //   this.props.navigation.navigate('login');
  // }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../images/soon.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    maxWidth: 650,
  },
});
