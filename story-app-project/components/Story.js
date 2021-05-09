import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  Animated,
} from "react-native";
const colors = require("../assets/colors");

const Story = (props) => {
  return (
    <View style={styles.screen}>
      {props.img && (
        <View style={styles.image}>
          <Image
            source={{ uri: props.img }}
            style={{ width: 360, height: 270, margin: 10, borderRadius: 10 }}
          />
        </View>
      )}
      {props.cap !== "" && (
        <View style={styles.cap}>
          <Text style={styles.text}>{props.cap}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    margin: 12,
    fontSize: 22,
    fontWeight: "100",
    color: colors.primary,
  },
});

export default Story;
