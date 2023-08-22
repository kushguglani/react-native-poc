import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";
import { navigate } from "../navigationRef";

function WelcomeScreen({navigation}) {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/logo.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.jpg")} />
        <Text style={styles.tagline}>LT-LK Dost</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={()=>navigation.navigate('Signin', {name: 'Jane'})} />
        <Button title="Register" color="secondary" onPress={()=>navigation.navigate('Signup', {name: 'Jane'})}/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
