import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Modalx extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
    this.hideModal = this.hideModal.bind(this);
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
          />
          <Input
            label="Description"
            defaultValue={this.props.data.description}
            containerStyle={styles.inputCon}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
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
          />
          <Button
            title="Change"
            buttonStyle={styles.button}
            containerStyle={styles.buttonCon}
          />
          <Button
            title="Delete"
            buttonStyle={styles.buttonRed}
            containerStyle={styles.buttonCon}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    marginBottom: 25,
  },
});
