import React from 'react';
import {View, Text, BackHandler, Alert, Modal} from 'react-native';
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

  render() {
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
            <View>
              <Text onPress={this.props.event}>>Hello World!</Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
