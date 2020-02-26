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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import {ScrollView} from 'react-native-gesture-handler';
import {add} from '../redux/actions/cart';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const url = 'http://100.24.32.116:9999/api/v1/products?page=';

// function Children() {
//   return <Text>{this.props.data.name}</Text>;
// }

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataEdit: [],
      fetchComplete: true,
      show: false,
      currentPage: 1,
    };
    // this.fillModal = this.fillModal.bind(this);
    this.toRupiah = this.toRupiah.bind(this);
    this.showModal = this.showModal.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  getData() {
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

  addToCart(item) {
    this.props.dispatch(add(item));
    // this.props.dispatch(add(item));
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

  showModal() {
    this.setState({
      show: this.state.show ? false : true,
    });
  }

  // fillModal = item => {
  //   console.log(item);
  //   // this.setState({
  //   //   data: item,
  //   // });
  // };

  renderItem({item}) {
    return (
      <TouchableOpacity
        style={styles.listCon}
        onPress={() =>
          this.props.cart.cartList.some(x => x.id === item.id)
            ? false
            : this.addToCart(item)
        }
        onLongPress={() => {
          this.setState({dataEdit: item});
          this.showModal();
        }}>
        <View>
          <Image
            source={{uri: item.image.replace('localhost', '100.24.32.116')}}
            style={styles.listImg}
          />
          {this.props.cart.cartList.some(x => x.id === item.id) ? (
            <View style={styles.clicked}>
              <Ionicons
                size={50}
                name="ios-checkmark-circle-outline"
                style={styles.icon}
              />
            </View>
          ) : (
            <Text style={styles.dummy}> </Text>
          )}
        </View>
        <View style={styles.listTextCon}>
          <Text style={styles.listName}>{item.name}</Text>
          <Text style={styles.listPrice}>Rp. {this.toRupiah(item.price)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  changePage(x) {
    console.log('ini nih = ' + x);
  }

  // componentDidMount() {
  //   this.getData();
  // }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0,0,0,.3)" translucent={true} />
        {this.state.fetchComplete ? (
          <View style={styles.flatCon}>
            <ScrollView>
              {this.props.products.productList.length > 0 ? (
                <FlatList
                  data={this.props.products.productList}
                  renderItem={this.renderItem.bind(this)}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <Image
                  source={require('../images/empty.png')}
                  style={styles.empty}
                />
              )}
            </ScrollView>
            <Pagination page={this.changePage} style={styles.page} />
          </View>
        ) : (
          <ActivityIndicator size="large" style={styles.loading} />
        )}
        <View style={styles.modal}>
          <Modal
            show={this.state.show}
            event={this.showModal}
            data={this.state.dataEdit}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    paddingTop: 30,
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
  loading: {
    flex: 1,
  },
  modal: {
    position: 'absolute',
  },
  clicked: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.6)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  icon: {
    color: 'rgba(255,255,255,.75)',
  },
  dummy: {
    position: 'absolute',
  },
});

const mapStateToProps = state => {
  return {
    cart: state.cart,
    products: state.products,
  };
};
export default connect(mapStateToProps)(Home);
