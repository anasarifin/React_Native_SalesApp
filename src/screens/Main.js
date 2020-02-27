import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Badge} from 'react-native-elements';
import Home from './Home';
import Drawer from './Drawer';
import History from './History';
import Modal from './Modal';
import Cart from './Cart';
import Logout from './Logout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {connect} from 'react-redux';
import {category, products} from '../redux/actions/products';

const Tab = createMaterialBottomTabNavigator();

class Main extends React.Component {
  getData() {
    this.props.dispatch(
      products('http://100.24.32.116:9999/api/v1/products?page=1'),
    );
    this.props.dispatch(category());
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        backBehavior="none">
        <Tab.Screen
          name="Home"
          component={Drawer}
          options={{
            tabBarIcon: () => (
              <View>
                <AntDesign style={styles.icon} size={25} name={'home'} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={Modal}
          initialParams={{show: true}}
          options={{
            tabBarIcon: () => (
              <View>
                <Ionicons
                  style={styles.icon}
                  size={25}
                  name={'md-add-circle-outline'}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: () => (
              <View>
                {this.props.cart.cartList.length > 0 ? (
                  <Badge
                    value={this.props.cart.cartList.length}
                    status="error"
                    containerStyle={styles.badgeCon}
                    textStyle={styles.badgeText}
                    badgeStyle={styles.badge}
                  />
                ) : (
                  <Text style={styles.dummy}> </Text>
                )}

                <Material style={styles.icon} size={25} name={'cart-outline'} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: () => (
              <View>
                <AntDesign style={styles.icon} size={25} name={'areachart'} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Logout"
          component={Logout}
          options={{
            tabBarIcon: () => (
              <View>
                <Ionicons style={styles.icon} size={25} name={'md-power'} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

// const url = 'http://192.168.42.142:9999/api/v1/products';

// export default class Main extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [
//         {
//           id: 8,
//           name: 'Anago',
//           description: 'Eel Sushi',
//           price: 10000,
//           stock: 97,
//           image:
//             'http://localhost:9999/public/img/2020-02-19T15-16-25.516Zanago.jpg',
//           category_id: 0,
//           updated_at: '2020-02-19T15:16:25.000Z',
//           created_at: '2020-02-04T13:13:14.000Z',
//         },
//         {
//           id: 36,
//           name: 'Karaage',
//           description: 'Fried Chicken',
//           price: 50000,
//           stock: 100,
//           image:
//             'http://localhost:9999/public/img/2020-02-20T06-36-37.412Zkaraage.jpg',
//           category_id: 0,
//           updated_at: '2020-02-20T06:36:37.000Z',
//           created_at: '2020-02-20T06:36:37.000Z',
//         },
//       ],
//       fetchComplete: false,
//     };
//     this.toRupiah = this.toRupiah.bind(this);
//   }
//   getData() {
//     // fetch(url)
//     //   .then(response => response.json())
//     //   .then(resolve => {
//     //     this.setState({
//     //       data: resolve,
//     //     });
//     //   })
//     //   .catch(err => console.warn(err));
//     Axios.get(url)
//       .then(resolve => {
//         this.setState({
//           data: resolve.data,
//           fetchComplete: true,
//         });
//       })
//       .catch(err => {
//         console.warn(err);
//       });
//   }

//   toRupiah(number) {
//     let number_string = number.toString();
//     let leftover = number_string.length % 3;
//     let rupiah = number_string.substr(0, leftover);
//     let thousand = number_string.substr(leftover).match(/\d{3}/g);
//     if (thousand) {
//       let separator = leftover ? '.' : '';
//       rupiah += separator + thousand.join('.');
//     }
//     return rupiah;
//   }

//   renderItem({item}) {
//     return (
//       <View style={styles.listCon}>
//         <Image source={require('../images/sushi.jpg')} style={styles.listImg} />
//         <View style={styles.listTextCon}>
//           <Text style={styles.listText}>{item.name}</Text>
//           <Text style={styles.listText}>Rp. {item.price}</Text>
//         </View>
//       </View>
//     );
//   }
//   componentDidMount() {
//     this.getData();
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={this.state.data}
//           renderItem={this.renderItem}
//           keyExtractor={(item, index) => index}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'salmon',
//     paddingTop: 30,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   listCon: {
//     flex: 1,
//     flexDirection: 'row',
//     marginVertical: 5,
//   },
//   listImg: {
//     width: 150,
//     height: 150,
//   },
//   listTextCon: {
//     justifyContent: 'flex-end',
//   },
//   listText: {
//     fontSize: 20,
//     marginHorizontal: 10,
//   },
// });

const styles = StyleSheet.create({
  icon: {
    color: 'white',
  },
  badgeCon: {
    position: 'absolute',
    zIndex: 10,
    right: -9,
    top: -5,
  },
  badgeText: {
    fontSize: 12,
    marginBottom: 2,
  },
  badge: {
    width: 20,
    height: 20,
  },
  dummy: {
    position: 'absolute',
  },
});

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps)(Main);
