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
        <View>
          <TextInput placeholder="Name" />
          <TextInput placeholder="Description" />
          <TextInput keyboardType={'numeric'} placeholder="Price" />
          <TextInput keyboardType={'numeric'} placeholder="Stock" />
          {/* <Text onPress={this.props.event}>Hide</Text> */}
        </View>
      </SafeAreaView>
    );
  }
}
