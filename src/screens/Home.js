import React from 'react';
import Axios from 'axios';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
// import {TouchableHighlight} from 'react-native-gesture-handler';

const url = 'http://100.24.32.116:9999/api/v1/products?page=';

// function Children() {
//   return <Text>{this.props.data.name}</Text>;
// }

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataEdit: [],
      fetchComplete: false,
      show: false,
      currentPage: 1,
    };
    // this.fillModal = this.fillModal.bind(this);
    this.toRupiah = this.toRupiah.bind(this);
    this.showModal = this.showModal.bind(this);
    this.changePage = this.changePage.bind(this);
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
        onLongPress={() => {
          this.setState({dataEdit: item});
          this.showModal();
        }}>
        <Image
          source={{uri: item.image.replace('localhost', '100.24.32.116')}}
          style={styles.listImg}
        />
        <View style={styles.listTextCon}>
          <Text style={styles.listText}>{item.name}</Text>
          <Text style={styles.listText}>Rp. {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  changePage(x) {
    console.log('ini nih = ' + x);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0,0,0,.3)" translucent={true} />
        <Text onPress={this.showModal}>Show Modal</Text>
        {this.state.fetchComplete ? (
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <ActivityIndicator size="large" style={styles.loading} />
        )}
        <Pagination page={this.changePage} />
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
  listImg: {
    width: 150,
    height: 150,
  },
  listTextCon: {
    justifyContent: 'flex-end',
  },
  listText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
  },
  modal: {
    position: 'absolute',
  },
});
