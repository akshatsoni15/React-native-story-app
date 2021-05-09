import { StatusBar } from "expo-status-bar";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import colors from "../assets/colors";

const AddStoryScreen = (props) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
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
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      props.imgHandler(result.uri);
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
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 280, height: 210, margin: 10 }}
          />
        )}
      </View>
      <View style={styles.input}>
        <TextInput
          style={{
            borderBottomWidth: 1,
            padding: 5,
            width: 300,
            justifyContent: "center",
            alignItems: "center",
            borderColor: colors.secondary,
            color: colors.secondary,
          }}
          placeholder="Enter Caption"
          placeholderTextColor={colors.secondary}
          onChangeText={(text) => {
            setCaption(text);
            props.capHandler(text);
          }}
          value={caption}
        ></TextInput>
      </View>

      <TouchableOpacity
        onPress={() => {
          props.onDone();
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
  input: {
    flex: 1,
    width: 300,
    maxWidth: "80%",

    justifyContent: "center",
    alignItems: "center",
  },
  pick: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
  },
  submit: {
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

export default AddStoryScreen;
