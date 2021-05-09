import { StatusBar, Alert, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import Svg, { Path, Image, ClipPath, Mask } from "react-native-svg";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  // Image,
} from "react-native";
import { gql, useMutation } from "@apollo/client";

const ADD_DP = gql`
  mutation($dp: String!) {
    addProfilePicture(dp: $dp) {
      dp
    }
  }
`;
const colors = require("../assets/colors");
const ProfileScreen = (props) => {
  const [addDp] = useMutation(ADD_DP);
  addDp({ variables: { dp: props.param.dp } });
  return (
    <View style={styles.screen}>
      <StatusBar />
      <View style={styles.dp}>
        <TouchableOpacity
          onPress={() => {
            props.onClickProfile();
          }}
          onLongPress={() => {
            props.onLongClick();
          }}
        >
          <Svg
            // strokeWidth={12}
            margin={10}
            width={300}
            height={300}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <Path
              // fill="none"
              stroke={
                props.param && (props.param.image || props.param.caption !== "")
                  ? props.isSeen
                    ? colors.ternary
                    : colors.secondary
                  : colors.primary
              }
              strokeWidth={12}
              d="M129.666 191.301H70.334l-48-34.874L4 100l18.334-56.427 48-34.874h59.332l48 34.874L196 100l-18.334 56.427z"
            />

            <ClipPath id="path">
              <Path
                fill="none"
                strokeWidth={12}
                d="M129.666 191.301H70.334l-48-34.874L4 100l18.334-56.427 48-34.874h59.332l48 34.874L196 100l-18.334 56.427z"
              />
            </ClipPath>
            <Image
              height="100%"
              width="100%"
              stroke={
                props.param && (props.param.image || props.param.caption !== "")
                  ? props.isSeen
                    ? colors.ternary
                    : colors.secondary
                  : colors.primary
              }
              href={
                props.param.dp
                  ? props.param.dp
                  : require("../assets/avatar.jpg")
              }
              clipPath="url(#path)"
            />
          </Svg>
          {!(
            props.param &&
            (props.param.image || props.param.caption !== "")
          ) && (
            <View style={styles.positionAdd}>
              <TouchableOpacity
                onPress={() => {
                  props.onAddStory();
                }}
              >
                <View style={styles.addStoryButton}>
                  <Text style={{ color: "black", fontSize: 30 }}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>
          Name:{" "}
          {props.param && (
            <Text style={{ color: colors.ternary }}>{props.param.name}</Text>
          )}
        </Text>
        <Text style={styles.text}>
          Bio:{" "}
          {props.param && (
            <Text style={{ color: colors.ternary }}>{props.param.bio}</Text>
          )}
        </Text>
        {/* <TouchableOpacity
          style={styles.changeInfo}
          onPress={() => {
            props.onAddInfo();
          }}
        >
          <Text style={{ color: colors.ternary }}>Change Info</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  dp: {
    flex: 1.5,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    margin: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  decagon: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    borderWidth: 10,

    // borderColor: colors.primary,
    // borderOffset: 10,
  },
  addStoryButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  changeInfo: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.ternary,
    borderWidth: 2,
    width: 150,
    maxWidth: "80%",
    padding: 5,
    borderRadius: 10,
    marginTop: 30,
  },
  positionAdd: {
    position: "absolute",
    right: 25,
    top: 230,
  },
});

export default ProfileScreen;
