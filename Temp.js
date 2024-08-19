import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import StreakTracker from './Task.js';
import FlatButton from './FlatButton.js';
export default function App() {

  return (
    <View style={styles.container}>
      {/* <Text>O</Text> */}
      <StreakTracker taskName={"LOL"} />
      <StreakTracker taskName="Daily Exercise" />
      <StreakTracker taskName="Reading" />
      <StreakTracker taskName="Meditation" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
