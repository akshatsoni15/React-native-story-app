import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import colors from "../assets/colors";

const AddDpScreen = (props) => {
  const [dp, setDp] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
          props.onDone();
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setDp(result.uri);
      props.dpHandler(result.uri);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.pick}>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: colors.secondary,
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <Text style={{ color: "black" }}>
              Pick an image from camera roll
            </Text>
          </TouchableOpacity>
        </View>
        {dp && (
          <Image
            source={{ uri: dp }}
            style={{ width: 280, height: 210, margin: 20 }}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={() => {
          props.onDone();
          // console.log(dp);
        }}
      >
        <View style={styles.submit}>
          <Text style={{ color: colors.secondary }}>Done!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  pick: {
    // flex: 1,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
  },
  submit: {
    // flex: 1,
    marginBottom: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.secondary,
    borderWidth: 2,
    width: 150,
    padding: 5,
    borderRadius: 10,
    marginBottom: 50,
  },
});

export default AddDpScreen;
