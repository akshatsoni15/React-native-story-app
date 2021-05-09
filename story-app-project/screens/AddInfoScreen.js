import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
const colors = require("../assets/colors");

const AddInfoScreen = (props) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Change Name"
        style={styles.input}
        onChangeText={(text) => {
          setName(text);
          props.nameHandler(text);
        }}
        value={name}
      ></TextInput>
      <TextInput
        placeholder="Change Bio"
        style={styles.input}
        onChangeText={(text) => {
          setBio(text);
          props.bioHandler(text);
        }}
        value={bio}
      ></TextInput>
      <TouchableOpacity
        style={styles.changeInfo}
        onPress={() => {
          props.onChange();
        }}
      >
        <Text style={{ color: colors.secondary }}>Change Info</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ternary,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    // flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
  },
  changeInfo: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.secondary,
    borderWidth: 2,
    width: 150,
    padding: 5,
    borderRadius: 10,
    marginTop: 30,
  },
});

export default AddInfoScreen;
