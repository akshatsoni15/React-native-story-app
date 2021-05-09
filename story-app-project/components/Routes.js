import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "../screens/ProfileScreen";
import StoryScreen from "../screens/StoryScreen";
import AddStoryScreen from "../screens/AddStoryScreen";
import AddInfoScreen from "../screens/AddInfoScreen";
import AddDpScreen from "../screens/AddDpScreen";
import { gql, useQuery } from "@apollo/client";

const INFO = gql`
  query {
    getUserDetails {
      dp
      name
      bio
    }
  }
`;

const profileScreen = ({ navigation, route }) => {
  const [seen, setSeen] = useState(false);
  const { loading, error, data } = useQuery(INFO);
  // console.log(data);
  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  var params = {
    dp: data.getUserDetails[0].dp,
    name: data.getUserDetails[0].name,
    bio: data.getUserDetails[0].bio,
    // dp: null,
    // name: "",
    // bio: "",
    image: null,
    caption: "",
  };

  if (route.params) params = route.params;
  return (
    <ProfileScreen
      onClickProfile={() => {
        if (params.image || params.caption !== "") {
          setSeen(true);
          navigation.navigate("story", {
            img: params ? params.image : null,
            cap: params ? params.caption : "",
          });
        }
      }}
      isSeen={seen}
      onAddStory={() => {
        navigation.navigate("addStory", params);
      }}
      onLongClick={() => {
        navigation.navigate("addDp", params);
      }}
      // deleteStory={deleteStory}
      onAddInfo={() => {
        navigation.navigate("addInfo", params);
      }}
      param={params}
    ></ProfileScreen>
  );
};

const storyScreen = ({ navigation, route }) => {
  const { img, cap } = route.params;
  return (
    <StoryScreen
      goBack={() => navigation.navigate("home")}
      img={img}
      cap={cap}
    ></StoryScreen>
  );
};

const addStoryScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const imageHandler = (img) => {
    setImage(img);
  };
  const captionHandler = (cap) => {
    setCaption(cap);
  };
  // console.log(route.params);
  const onDone = () => {
    navigation.navigate("home", {
      dp: route.params.dp,
      name: route.params.name,
      bio: route.params.bio,
      image: image,
      caption: caption,
    });
  };

  return (
    <AddStoryScreen
      imgHandler={imageHandler}
      capHandler={captionHandler}
      onDone={onDone}
    ></AddStoryScreen>
  );
};

const addDpScreen = ({ navigation, route }) => {
  const [dp, setDp] = useState(null);
  const dpHandler = (img) => {
    setDp(img);
  };
  // console.log(route.params);
  const onDone = () => {
    navigation.navigate("home", {
      dp: dp,
      name: route.params.name,
      bio: route.params.bio,
      image: route.params.image,
      caption: route.params.caption,
    });
  };

  return <AddDpScreen dpHandler={dpHandler} onDone={onDone}></AddDpScreen>;
};

const addInfoScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const nameHandler = (nam) => {
    setName(nam);
  };
  const bioHandler = (bo) => {
    setBio(bo);
  };
  const infoHandler = () => {
    navigation.navigate("home", {
      dp: null,
      name: name,
      bio: bio,
      image: route.params.image,
      caption: route.params.caption,
    });
  };
  return (
    <AddInfoScreen
      onChange={infoHandler}
      nameHandler={nameHandler}
      bioHandler={bioHandler}
    ></AddInfoScreen>
  );
};

const Stack = createStackNavigator();

export default function Routes() {
  return (
    // <Text>hello</Text>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          options={{ header: () => null }}
          component={profileScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="story"
          options={{ header: () => null }}
          component={storyScreen}
          mode="card"
        ></Stack.Screen>
        <Stack.Screen
          name="addStory"
          options={{ header: () => null }}
          component={addStoryScreen}
          mode="card"
        ></Stack.Screen>
        <Stack.Screen
          name="addInfo"
          options={{ header: () => null }}
          component={addInfoScreen}
          mode="card"
        ></Stack.Screen>
        <Stack.Screen
          name="addDp"
          options={{ header: () => null }}
          component={addDpScreen}
          mode="card"
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
