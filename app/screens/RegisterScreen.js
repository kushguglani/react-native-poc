import React from "react";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from "../redux/actions/action";
// import { hashPassword } from "../config/helper";
import isaac from "isaac";
import { Link } from '@react-navigation/native';


function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.userDetails);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    phone: Yup.string().required().label("Phone"),
    phone: Yup.string().required().length(10).label("Phone"),
    pin: Yup.string().required().min(4).label("Pin"),
    confirmPin: Yup.string().oneOf([Yup.ref('pin'), null], 'Pin must match')
  });
  // dispatch(removeUser())
  const registerUser = async (values, helpers) => {
   
    delete values.confirmPin;
    values.id = String(Math.floor(isaac.random() * 256)) + String(Date.now());
    values.created = Date.now();
    // values.pin = await hashPassword(values.pin);
    if (users && users.length > 0) {
      const contactArray = users.map(user => user.phone);
      let userRegistered = contactArray.indexOf(values.phone) > -1 ? true : false;
      if (userRegistered) {
        return Alert.alert("Error", "Phone Number already registered!")
      }
    }
    dispatch(addUser(values));
    Alert.alert("Registered successfully", "Thank You!");
    helpers.resetForm({
      values,
    });
    navigation.navigate('Signin')
  }

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", pin: "", confirmPin: "" }}
        onSubmit={(values, helpers) => registerUser(values, helpers)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          name="phone"
          placeholder="Phone Number(10 digit)"
          textContentType="telephoneNumber"
          keyboardType='numeric'
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="pin"
          placeholder="Create Pin"
          secureTextEntry
          textContentType="password"
          keyboardType='numeric'
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPin"
          placeholder="Confirm Pin"
          secureTextEntry
          textContentType="password"
          keyboardType='numeric'
        />
        <SubmitButton title="Register" />
      </Form>
      <Link
        style={{ color: "blue", paddingTop:10}}
        to={'/Signin'} >
        Already have Account ? Login
      </Link>

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
