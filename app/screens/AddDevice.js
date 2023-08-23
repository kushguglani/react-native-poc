import React from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from "yup";
import { Link } from '@react-navigation/native';

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import { comparePassword } from "../config/helper";
import { sendDirectSms } from "../config/smsMethods";
import SmsListener from 'react-native-android-sms-listener'

function AddDevice(props) {
  const users = useSelector(state => state.userDetails);
  let subscription = SmsListener.addListener(message => {
    console.info(message);
    alert(message.originatingAddress)
    alert(message.body)
    alert(message.timestamp)
  })
  // subscription.remove()
  const validationSchema = Yup.object().shape({
    phone: Yup.string().required().label("Phone"),
  });
  const addADevice = async (values, helpers) => {
    let { phone } = values;
    let user = users.find(user => user.phone === phone);
    console.log({ user });
    if (phone.length != 10) {
      return Alert.alert("Error", `Not a phone it's uuid ${phone}`)
    } else {
      // send message to register a device 
      sendDirectSms(phone)
    }

    // navigation.navigate('Signin')
  }

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.jpg")} />

      <Form
        initialValues={{ phone: "" }}
        onSubmit={(values, helpers) => addADevice(values, helpers)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="devices"
          name="phone"
          placeholder="Phone Number(10 digit only) or UUID"
          textContentType="telephoneNumber"
          keyboardType='numeric'
        />
        <SubmitButton title="ADD A Device" />
      </Form>
      <Link
        style={{ color: "blue", paddingTop: 10 }}
        to={'/Signup'} >
        My Devices
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

export default AddDevice;
