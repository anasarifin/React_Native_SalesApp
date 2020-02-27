import React from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
  Image,
  ToastAndroid,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {products} from '../redux/actions/products';

const url = 'http://100.24.32.116:9999/api/v1/products';

class Modalx extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      image: {uri: null, type: null, fileName: null},
    };
    this.hideModal = this.hideModal.bind(this);
    this.picker = this.picker.bind(this);
    this.postData = this.postData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  hideModal() {
    this.setState({
      show: false,
    });
  }

  //   handleBackPress() {
  //     this.props.event;
  //   }
  //   componentDidMount() {
  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  //   }
  //   nothing() {
  //     return false;
  //   }

  textChange(value, type) {
    this.setState({
      [type]: value,
    });
  }

  postData() {
    console.log(url + '/' + this.props.data.id);
    const formData = new FormData();
    formData.append('name', this.state.name || this.props.data.name);
    formData.append(
      'description',
      this.state.description || this.props.data.description,
    );
    formData.append('price', this.state.price || this.props.data.price);
    formData.append('stock', this.state.stock || this.props.data.stock);
    formData.append('image', {
      uri: this.state.image.uri,
      type: this.state.image.type,
      name: this.state.image.fileName,
    });
    formData.append('category_id', this.state.category || 0);
    // if (
    //   !this.state.name ||
    //   !this.state.description ||
    //   !this.state.price ||
    //   !this.state.stock
    // ) {
    //   ToastAndroid.show('Adding failed!', ToastAndroid.SHORT);
    // }
    Axios.patch(url + '/' + this.props.data.id, formData, {
      headers: {
        usertoken: AsyncStorage.getItem('token'),
      },
    })
      .then(() => {
        this.props.dispatch(
          products('http://100.24.32.116:9999/api/v1/products'),
        );
        ToastAndroid.show('Edit success!', ToastAndroid.SHORT);
        this.props.event();
      })
      .catch(() => {
        this.props.dispatch(
          products('http://100.24.32.116:9999/api/v1/products'),
        );
        ToastAndroid.show('Edit failed!', ToastAndroid.SHORT);
        this.props.event();
      });
  }

  deleteData() {
    Axios.delete(url + '/' + this.props.data.id, {
      headers: {
        usertoken: AsyncStorage.getItem('token'),
      },
    })
      .then(() => {
        this.props.dispatch(
          products('http://100.24.32.116:9999/api/v1/products'),
        );
        ToastAndroid.show('Delete success!', ToastAndroid.SHORT);
        this.props.event();
      })
      .catch(() => {
        this.props.dispatch(
          products('http://100.24.32.116:9999/api/v1/products'),
        );
        ToastAndroid.show('Delete failed!', ToastAndroid.SHORT);
        this.props.event();
      });
  }

  picker = async () => {
    const options = {
      title: 'Select Image',
      takePhotoButtonTitle: 'Take photo from camera',
      chooseFromLibraryButtonTitle: 'Choose photo from gallery',
    };

    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response.uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          image: response,
        });
      }
    });
  };

  // setCategory() {
  //   this.setState({
  //     category: this.props.data.category_id,
  //   });
  // }

  // componentDidMount() {
  //   this.setCategory();
  // }

  render() {
    // this.getName();
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.show}
        //   onRequestClose={
        //     this.props.show === true ? this.props.event : this.nothing
        //   }
      >
        <StatusBar backgroundColor="rgba(0,0,0,.3)" translucent={true} />
        <TouchableOpacity style={styles.back} onPress={this.props.event}>
          <Ionicons name="md-arrow-round-back" size={30} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <Input
            label="Name"
            defaultValue={this.props.data.name}
            containerStyle={styles.inputCon}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            onChange={e => this.setState({name: e.nativeEvent.text})}
          />
          <Input
            label="Description"
            defaultValue={this.props.data.description}
            containerStyle={styles.inputCon}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            onChange={e => this.setState({description: e.nativeEvent.text})}
          />
          <Input
            label="Price"
            defaultValue={
              this.props.data.price ? this.props.data.price.toString() : ''
            }
            keyboardType={'numeric'}
            containerStyle={styles.inputCon}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            onChange={e => this.setState({price: e.nativeEvent.text})}
          />
          <Input
            label="Stock"
            defaultValue={
              this.props.data.stock ? this.props.data.stock.toString() : ''
            }
            keyboardType={'numeric'}
            containerStyle={styles.inputCon}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            onChange={e => this.setState({stock: e.nativeEvent.text})}
          />
          <Picker
            selectedValue={this.state.category}
            style={styles.picker}
            onValueChange={value => this.setState({category: value})}>
            {this.props.products.categoryList.map((item, index) => {
              return (
                <Picker.Item key={index} label={item.name} value={item.id} />
              );
            })}
          </Picker>
          <Button
            onPress={this.picker}
            title="Select Image"
            buttonStyle={styles.buttonImage}
          />
          <Image
            source={{
              uri: this.state.image.uri
                ? this.state.image.uri
                : this.props.data.image
                ? this.props.data.image.replace('localhost', '100.24.32.116')
                : null,
            }}
            style={styles.preview}
          />
        </View>
        <Button
          title="Change"
          buttonStyle={styles.button}
          containerStyle={styles.buttonCon}
          onPress={this.postData}
        />
        <Button
          title="Delete"
          buttonStyle={styles.buttonRed}
          containerStyle={styles.buttonCon}
          onPress={this.deleteData}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  inputCon: {
    alignItems: 'center',
  },
  back: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'whitesmoke',
  },
  backText: {
    fontSize: 22,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 40,
    width: '90%',
  },
  inputText: {
    textAlign: 'center',
  },
  label: {
    marginTop: 20,
  },
  button: {
    width: '85%',
  },
  buttonRed: {
    width: '85%',
    backgroundColor: 'red',
  },
  buttonCon: {
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonImage: {
    height: 30,
    borderRadius: 0,
  },
  picker: {
    width: '60%',
    height: 50,
    marginTop: -15,
    marginBottom: 15,
  },
  preview: {
    width: 100,
    height: 100,
    marginTop: 2,
  },
});

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Modalx);
