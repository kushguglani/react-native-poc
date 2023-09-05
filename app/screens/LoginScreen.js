import React from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from "yup";
import { Link } from '@react-navigation/native';

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
// import { comparePassword } from "../config/helper";


function LoginScreen({navigation}) {
  const users = useSelector(state => state.userDetails);

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required().length(10).label("Phone"),
    pin: Yup.string().required().min(4).label("Password"),
  });
  const LoginUser = async (values, helpers) => {
    let { phone, pin } = values;
    let user = users && users.length>0 && users.find(user => user.phone === phone);
    if (!user) {
      return Alert.alert("Error", `Phone Number not Registered ${phone}`)
    }
    // let op = await comparePassword(pin, user.pin);
    let op = (pin === user.pin);
    if (!op) {
      return Alert.alert("Error", `Invalid Credentials!`)
    }
    Alert.alert("Login successfully", "Thank You!");
    navigation.navigate('AddDevice')
  }
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.jpg")} />

      <Form
        initialValues={{ phone: "", password: "" }}
        onSubmit={(values, helpers) => LoginUser(values, helpers)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          name="phone"
          placeholder="Phone Number(10 digit only)"
          textContentType="telephoneNumber"
          keyboardType='numeric'
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="pin"
          placeholder="Enter Pin"
          secureTextEntry
          textContentType="password"
          keyboardType='numeric'
        />
        <SubmitButton title="Login" />
      </Form>
      <Link
        style={{ color: "blue", paddingTop: 10 }}
        to={'/Signup'} >
        Don't have Account ? Register
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
