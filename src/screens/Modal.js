import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Picker,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

const url = 'http://100.24.32.116:9999/api/v1/products';

class Modalx extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      category: 0,
    };
    this.hideModal = this.hideModal.bind(this);
    this.picker = this.picker.bind(this);
    this.postData = this.postData.bind(this);
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
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('price', this.state.price);
    formData.append('stock', this.state.stock);
    formData.append('image', this.state.image);
    formData.append('category_id', this.state.category);
    console.log('ok');
    Axios.post(url, formData, {
      headers: {
        usertoken: AsyncStorage.getItem('token'),
      },
    })
      .then(resolve => {
        console.log(resolve);
      })
      .catch(reject => {
        console.log(reject);
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
        const source = {uri: response.uri};
        // console.log(response.path);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          image: source,
        });
      }
    });
  };

  render() {
    // this.getName();
    return (
      <SafeAreaView
        style={styles.containerMain}
        //   onRequestClose={
        //     this.props.show === true ? this.props.event : this.nothing
        //   }
      >
        <StatusBar backgroundColor="rgba(0,0,0,.3)" translucent={false} />
        {/* <TouchableOpacity style={styles.back} onPress={this.props.event}>
          <Ionicons name="md-arrow-round-back" size={30} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity> */}
        <View style={styles.container}>
          <Input
            label="Name"
            containerStyle={styles.inputCon}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            onChange={e => this.setState({name: e.nativeEvent.text})}
          />
          <Input
            label="Description"
            containerStyle={styles.inputCon}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            onChange={e => this.setState({description: e.nativeEvent.text})}
          />
          <Input
            label="Price"
            keyboardType={'numeric'}
            containerStyle={styles.inputCon}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            onChange={e => this.setState({price: e.nativeEvent.text})}
          />
          <Input
            label="Stock"
            keyboardType={'numeric'}
            containerStyle={styles.inputCon}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            onChange={e => this.setState({stock: e.nativeEvent.text})}
          />
          <TouchableOpacity onPress={this.picker}>
            <Text>Image</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={this.state.category}
            style={styles.picker}
            onValueChange={value => this.setState({category: value})}>
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
          <Image source={this.state.imageSource} />
        </View>
        <Button
          title="Add"
          buttonStyle={styles.button}
          containerStyle={styles.buttonCon}
          onPress={this.postData}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
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
    marginBottom: 20,
  },
  picker: {
    width: '60%',
    height: 50,
  },
});

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Modalx);
