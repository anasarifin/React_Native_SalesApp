import React from 'react';
import {View, Text, TextInput, BackHandler, Alert, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.show}
          //   onRequestClose={
          //     this.props.show === true ? this.props.event : this.nothing
          //   }
        >
          <View>
            <TextInput defaultValue={this.props.data.name} />
            <TextInput defaultValue={this.props.data.description} />
            <TextInput
              defaultValue={
                this.props.data.price ? this.props.data.price.toString() : ''
              }
              keyboardType={'numeric'}
            />
            <TextInput
              defaultValue={
                this.props.data.stock ? this.props.data.stock.toString() : ''
              }
              keyboardType={'numeric'}
            />
            <Text onPress={this.props.event}>Hide</Text>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
