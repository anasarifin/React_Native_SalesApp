import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function MainCarts() {
  return (
    <SafeAreaView>
      <Text style={styles.test}>Click</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: 'blue',
    width: Dimensions.get('window').width * 0.5,
  },
});
