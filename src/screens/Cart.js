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
import CartList from './CartList';

const url = 'http://100.24.32.116:9999/api/v1/products?page=';
const urlCheckout = 'http://localhost:9999/api/v1/cart';
// function Children() {
//   return <Text>{this.props.data.name}</Text>;
// }

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataEdit: [],
      fetchComplete: false,
      show: false,
      order: 1,
      stock: 9,
    };
    // this.fillModal = this.fillModal.bind(this);
    this.toRupiah = this.toRupiah.bind(this);
    // this.showModal = this.showModal.bind(this);
    // this.changePage = this.changePage.bind(this);
    this.resetCart = this.resetCart.bind(this);
    this.checkout = this.checkout.bind(this);
    this.reduceStock = this.reduceStock.bind(this);
    this.addStock = this.addStock.bind(this);
  }

  reduceStock() {
    if (this.state.order > 1) {
      this.setState({
        order: this.state.order - 1,
        stock: this.state.stock + 1,
      });
    }

    // Axios.delete(url, { data: { id: this.props.product.product_id, qty: 1 }, headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
    // 	console.log(resolve);
    // });
  }

  addStock() {
    if (this.state.stock > 0) {
      this.setState({
        order: this.state.order + 1,
        stock: this.state.stock - 1,
      });
      // this.props.dispatch(addPrice(this.props.product.price));
      // Axios.patch(url, { id: this.props.product.product_id, qty: 1 }, { headers: { usertoken: localStorage.getItem("token") } }).then(resolve => {
      // 	console.log(resolve);
      // });
    }
  }

  getCart() {
    Axios.get(url + this.state.currentPage)
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

  resetCart() {
    // console.log(this.props);
    this.props.dispatch(reset());
  }

  checkout() {
    const data = this.props.cart.cartList;
    const final = [1, 1, 1];
    // const order = this.props.cart.cartList;
    // for (let x = 0; x < order.length; x++) {
    //   final.push(x + 1);
    // }

    Axios.post(
      urlCheckout,
      {data: data, order: final},
      {
        headers: {
          usertoken: AsyncStorage.getItem('token'),
        },
      },
    )
      .then(resolve => {
        console.log(resolve);
        this.resetCart();
      })
      .catch(reject => {
        console.log('failed = ' + reject);
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

  //   showModal() {
  //     this.setState({
  //       show: this.state.show ? false : true,
  //     });
  //   }

  // fillModal = item => {
  //   console.log(item);
  //   // this.setState({
  //   //   data: item,
  //   // });
  // };

  // componentDidMount() {
  //   this.setState({
  //     stock: this.props.product.stock - 1,
  //   });
  // }

  // renderItem({item}) {
  //   return (
  //     <View style={styles.listCon}>
  //       <Image
  //         source={{uri: item.image.replace('localhost', '100.24.32.116')}}
  //         style={styles.listImg}
  //       />
  //       <View style={styles.listTextCon}>
  //         <Text style={styles.listName}>{item.name}</Text>
  //         <View style={styles.orderCon}>
  //           <TouchableOpacity
  //             style={styles.orderButton}
  //             onPress={this.reduceStock}>
  //             <Ionicons style={styles.icon} size={25} name={'ios-remove'} />
  //           </TouchableOpacity>
  //           <Text style={styles.orderButton}>{this.state.order}</Text>
  //           <TouchableOpacity
  //             style={styles.orderButton}
  //             onPress={this.addStock}>
  //             <Ionicons style={styles.icon} size={25} name={'ios-add'} />
  //           </TouchableOpacity>
  //         </View>
  //         <Text style={styles.listPrice}>Rp. {this.toRupiah(item.price)}</Text>
  //       </View>
  //     </View>
  //   );
  // }

  // changePage(x) {
  //   console.log('ini nih = ' + x);
  // }

  //   componentDidMount() {
  //     this.getCart();
  //   }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0,0,0,.3)" translucent={true} />
        {this.props.cart.cartList.length > 0 ? (
          <View style={styles.flatCon}>
            <SafeAreaView>
              {this.props.cart.cartList.length > 0 ? (
                this.props.cart.cartList.map((item, index) => {
                  return <CartList data={item} key={index} />;
                })
              ) : (
                <Text>null</Text>
              )}
              {/* <FlatList
                data={this.props.cart.cartList}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={(item, index) => index.toString()}
              /> */}
            </SafeAreaView>
            <View style={styles.allButtonCon}>
              <Button
                onPress={this.checkout}
                title="Checkout"
                containerStyle={styles.buttonCon}
                buttonStyle={styles.button}
              />
              <Button
                onPress={this.resetCart}
                title="Cancel"
                containerStyle={styles.buttonCon}
                buttonStyle={styles.buttonRed}
              />
            </View>
          </View>
        ) : (
          <View style={styles.emptyCon}>
            <Image
              source={require('../images/empty.png')}
              style={styles.empty}
            />
          </View>
        )}

        {/* <View style={styles.modal}>
          <Modal
            show={this.state.show}
            event={this.showModal}
            data={this.state.dataEdit}
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  listCon: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  flatCon: {
    flex: 1,
  },
  listImg: {
    flex: 1,
    width: 150,
    height: 100,
    borderRadius: 7,
  },
  listTextCon: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
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
  loading: {
    flex: 1,
  },
  modal: {
    position: 'absolute',
  },
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
  allButtonCon: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  empty: {
    width: '100%',
    maxWidth: 500,
    marginTop: 100,
    resizeMode: 'contain',
  },
  emptyCon: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps)(Cart);
