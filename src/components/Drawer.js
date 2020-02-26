import React from 'react';
import {View, Picker, TextInput, Text, StyleSheet, Button} from 'react-native';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {products} from '../redux/actions/products';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const url = 'http://100.24.32.116:9999/api/v1/products?page=1';

class CustomDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      category: '',
      sort: 'name',
    };
  }

  filterName(value) {
    const name = '&name=' + value;
    this.setState({
      name: name,
    });
    this.props.dispatch(
      products(
        url +
          name +
          '&type=' +
          this.state.category +
          '&sort=' +
          this.state.sort,
      ),
    );
  }
  filterType(value) {
    const category = value;
    this.setState({category: category});
    this.props.dispatch(
      products(
        url +
          this.state.name +
          '&type=' +
          category +
          '&sort=' +
          this.state.sort,
      ),
    );
  }
  filterSort(value) {
    const sort = value;
    this.setState({sort: sort});
    this.props.dispatch(
      products(
        url +
          this.state.name +
          '&type=' +
          this.state.category +
          '&sort=' +
          sort,
      ),
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Search product here..."
          onChange={e => this.filterName(e.nativeEvent.text)}
        />
        <Picker
          style={styles.picker}
          selectedValue={this.state.category}
          onValueChange={value => this.filterType(value)}>
          <Picker.Item label={'All'} value={''} />
          {this.props.products.categoryList.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.name} value={item.id} />
            );
          })}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={this.state.sort}
          onValueChange={value => this.filterSort(value)}>
          <Picker.Item label={'Name A-Z'} value={'name'} />
          <Picker.Item label={'Name Z-A'} value={'name&dir=1'} />
          <Picker.Item label={'Stock +'} value={'stock&dir=1'} />
          <Picker.Item label={'Stock -'} value={'stock'} />
          <Picker.Item label={'Price +'} value={'price&dir=1'} />
          <Picker.Item label={'Price -'} value={'price'} />
          <Picker.Item label={'Updated Newer'} value={'updated_at&dir=1'} />
          <Picker.Item label={'Updated Older'} value={'update_at'} />
          <Picker.Item label={'Created Newer'} value={'created_at&dir=1'} />
          <Picker.Item label={'Created Older'} value={'created_at'} />
        </Picker>
        <TouchableOpacity style={styles.logout} onPress={this.props.event}>
          <Button title="   Logout   " color="red" style={styles.button} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    height: '100%',
  },
  logout: {
    alignItems: 'center',
    marginTop: 100,
  },
  picker: {
    marginTop: 15,
  },
});

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(CustomDrawer);
