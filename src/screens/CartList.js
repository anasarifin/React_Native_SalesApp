import React from 'react';
import Axios from 'axios';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Right,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {reset} from '../redux/actions/cart';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

class CartList extends React.Component {
  constructor() {
    super();
    this.state = {
      order: 1,
    };
    this.addStock = this.addStock.bind(this);
    this.reduceStock = this.reduceStock.bind(this);
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

  reduceStock() {
    if (this.state.order > 1) {
      this.setState({
        order: this.state.order - 1,
        stock: this.state.stock + 1,
      });
    }
  }

  addStock() {
    if (this.state.stock > 0) {
      this.setState({
        order: this.state.order + 1,
        stock: this.state.stock - 1,
      });
    }
  }

  componentDidMount() {
    this.setState({
      stock: this.props.data.stock,
    });
  }

  render() {
    return (
      //   <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: this.props.data.image.replace('localhost', '100.24.32.116'),
          }}
          style={styles.image}
        />
        <View style={styles.textCon}>
          <Text style={styles.listName}>{this.props.data.name}</Text>
          <View style={styles.orderCon}>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={this.reduceStock}>
              <Ionicons style={styles.icon} size={25} name={'ios-remove'} />
            </TouchableOpacity>
            <Text style={styles.orderButton}>{this.state.order}</Text>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={this.addStock}>
              <Ionicons style={styles.icon} size={25} name={'ios-add'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.listPrice}>
            Rp. {this.toRupiah(this.props.data.price * this.state.order)}
          </Text>
        </View>
      </View>
      //   </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 100,
    borderRadius: 7,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  textCon: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  listName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listPrice: {
    fontSize: 20,
  },
  orderCon: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  orderButton: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default CartList;
