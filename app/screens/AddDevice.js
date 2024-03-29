import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Alert, View, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from "yup";
import { Link } from '@react-navigation/native';

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import { isEmpty, isObject } from "../config/helper";
import { sendDirectSms } from "../config/smsMethods";
import SmsListener from 'react-native-android-sms-listener'
import { addDevice } from "../redux/actions/action";
import Spinner from 'react-native-loading-spinner-overlay';

function AddDevice({ navigation }) {
  const [regPhone, setRegPhone] = React.useState(null);
  const devices = useSelector(state => state.devices);
  const dispatch = useDispatch();
  const [dev, setdev] = React.useState();

  let [seconds, setSeconds] = useState(0)
  const [startTime, setStart] = useState(false);
  let current;
  const startTimer = () => {
    current = setInterval(() => {
      if (seconds < 12) {
        let time = ++seconds
        setSeconds(time)
      }
    }, 1000)
  }

  if (seconds >= 11) {
    clearInterval(current)
    setSeconds(0)
    setStart(false)
    subscription.remove()
  }


  let subscription = SmsListener.addListener(message => {
    if (!isEmpty(message) && regPhone && message?.timestamp) {
      try {
        const { originatingAddress, body, timestamp } = message;
        let number = originatingAddress.substr(originatingAddress.length - 10);

        if (!body.includes("RY_V")) {
          setStart(false)
          clearInterval(current)
          setSeconds(0)
          Alert.alert("Error", `Nunber not registered ${number}`);
          subscription.remove()
        }
        else if (number == regPhone.toString()) {
          // setStart(true)
          // startTimer()
          let op = body.replace("RUN HR", "RUN_HR");
          op = op.replaceAll('-\n', `-`);
          op = op.replaceAll('\n\n', `\n`);
          op = op.replaceAll('-', `":"`);
          op = op.replaceAll('\n', `","`);
          op = `{"${op}"}`;
          try {
            op = JSON.parse(op);
          } catch (e) {
            alert(e.toString())
            return console.error(e); // error in the above string (in this case, yes)!
          }
          jsonData.timestamp = timestamp;
          jsonData.number = number;
          dispatch(addDevice(jsonData));
          setdev(jsonData)
          setStart(false)
          clearInterval(current)
          setSeconds(0)
          subscription.remove()
          navigation.navigate('Dashboard', { data: jsonData })
          // alert(`op in objec ${op}`)
          // navigation.navigate('Dashboard')

        } else{
          subscription.remove()

        }
      }
      catch (e) {
        alert(e.toString())
      }
    }
  })
  useEffect(() => {
    if (!isEmpty(dev)) {
      subscription.remove()
      navigation.navigate('Dashboard')
    }
  }, [dev])
  useEffect(() => {
    console.log({ devices });
    if (devices && devices.length === 1) {
      navigation.navigate('Dashboard', { data: devices[0] })
    } else if (devices.length > 0) {
      navigation.navigate('Devices')
    }
  }, [])
  useEffect(() => {
    return () => { };
  }, []);
  const validationSchema = Yup.object().shape({
    phone: Yup.string().required().label("Phone"),
  });
  const addADevice = async (values, helpers) => {
    let { phone } = values;
    setRegPhone(phone)
    //check device already present

    let userRegistered = devices && devices.length > 0 && devices.find(device => device.number == phone);
    if (userRegistered) {
      return Alert.alert("Error", "Phone Number already registered!")
    }

    // let user = users.find(user => user.phone === phone);
    if (phone === "5") {
      let data = { "SUBTECH": "23/08/27,11:42", "POWER": "HEALTHY", "RY_V": "433", "YB_V": "434", "BR V": "433", "PUMP": "OFF", "RA": "0.0", "YA": "0 .0", "BA": "0.0", "MODE": "MAN", "SW": "GSM", " SIG": "99%", "RUN_HR": "0:0" }
      data.number = Math.ceil(Math.random() * 10000000000);
      data.timestamp = Date.now();
      dispatch(addDevice(data));
      navigation.navigate('Dashboard', { data })
    }
    
    else if (phone.length === 10) {
      // send message to register a device 

      sendDirectSms(phone, "status");
      setStart(true)
      startTimer()

    } else {
      return Alert.alert("Error", `Not a phone it's uuid ${phone}`)
    }
  }

  return (
    <>
      <Spinner
        visible={startTime}
        textContent={`Waiting for response...${seconds}`}
      // textStyle={styles.spinnerTextStyle}
      />
      <Screen style={[styles.container]}>
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
          style={styles.link}
          to={'/Devices'} >
          Go To My Devices
        </Link>
      </Screen>
    </>
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
  link: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    color: "blue",
    fontSize: 20,
    paddingTop: 10
  },
  parentDisable: {
    position: "absolute",
    top: 0,
    left: 0,
    background: "#666",
    opacity: 0.5,
    // display:'none',
  },
  overlayBar: {
    position: "absolute",
    color: "white",
    top: "50%",
    left: "20%",
    height: "100%",
    background: "#666",
    width: "100%",
    opacity: 1
  }
});

export default AddDevice;
