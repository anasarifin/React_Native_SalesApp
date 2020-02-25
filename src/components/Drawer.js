import React from 'react';
import {View, Picker, TextInput, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {products} from '../redux/actions/products';

const url = 'http://100.24.32.116:9999/api/v1/products?page=1';

class CustomDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 'all',
    };
  }

  search(value) {
    this.setState({
      name: value,
    });
    this.props.dispatch(products(url + '&name=' + value));
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search product here..."
          onChange={e => this.search(e.nativeEvent.text)}
        />
        <Picker
          selectedValue={this.state.category}
          onValueChange={value => {
            this.setState({category: value});
            this.props.dispatch(products(url + '&type=' + value));
          }}>
          <Picker.Item label={'All'} value={'All'} />
          {this.props.products.categoryList.map(item => {
            return (
              <Picker.Item label={item.name} value={parseFloat(item.id)} />
            );
          })}
          {/* <Picker.Item label="Java" value="0" />
            <Picker.Item label="JavaScript" value="1" />
            <Picker.Item label="JavaScript" value="2" />
            <Picker.Item label="JavaScript" value="3" /> */}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(CustomDrawer);
