// import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Story from "../components/Story";

const StoryScreen = (props) => {
  setTimeout(() => props.goBack(), 5001);
  return <Story {...props}></Story>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StoryScreen;
