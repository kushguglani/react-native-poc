import React, { useState } from 'react';
import {
    ImageBackground, StyleSheet,
    View, Image, Text, Dimensions,
    Button
} from "react-native";
import { isEmpty } from "../config/helper";
import { Switch } from 'react-native-switch';
import { useSelector, useDispatch } from 'react-redux';
import DropdownComponent from '../components/DropdownComponent';
import DotMenu from '../components/DotMenu';
import {Provider } from 'react-native-paper';

function DeviceDashboard({ navigation, route }) {
    // const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // alert('dash')
    // const devices = useSelector(state => state.devices);
    // const activeDevice = useSelector(state => state?.activeDevice);

    let deviceData = route.params.data;
    // if (activeDevice) {
    //     deviceData = devices.find(device => device.number === activeDevice);
    // }
    // alert(`activeDevice ${activeDevice}`)
    return (
        <ImageBackground
            blurRadius={10}
            style={styles.background}
            source={require("../assets/logo.jpg")}
        >
            {!isEmpty(deviceData) ?
                <Provider>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoContainer.deviceName}>Device</Text>
                        <DotMenu style={styles.logoContainer.dotMenu} navigation={navigation} />
                        {/* <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    activeText={'On'}
                    ActiveText={'Off'}
                    style={styles.switchMotor}
                /> */}
                    </View>
                    <View style={styles.imageConatiner}>
                        <Image style={styles.imageConatiner.deviceImage} source={require("../assets/logo.jpg")} />
                        <View style={styles.imageConatiner.dataContainer}>
                            <Text style={styles.imageConatiner.dataContainer.textData} > RY_V: <Text style={{ fontWeight: "bold" }}>{deviceData?.RY_V} </Text></Text>
                            <Text style={styles.imageConatiner.dataContainer.textData} > YB_V: <Text style={{ fontWeight: "bold" }}>{deviceData?.YB_V} </Text></Text>
                            <Text style={styles.imageConatiner.dataContainer.textData} > BR_V: <Text style={{ fontWeight: "bold" }}>{deviceData?.BR_V} </Text></Text>
                            <Text style={styles.imageConatiner.dataContainer.textData} > RA: <Text style={{ fontWeight: "bold" }}>{deviceData?.RA}   </Text></Text>
                            <Text style={styles.imageConatiner.dataContainer.textData} > YA: <Text style={{ fontWeight: "bold" }}>{deviceData?.YA}   </Text></Text>
                            <Text style={styles.imageConatiner.dataContainer.textData} > BA: <Text style={{ fontWeight: "bold" }}>{deviceData?.BA}  </Text></Text>
                            <Text style={styles.imageConatiner.dataContainer.textData} > MODE: <Text style={{ fontWeight: "bold" }}>{deviceData?.MODE === "MAN" ? "Manual" : "Automatic"}  </Text></Text>
                            <Text style={styles.imageConatiner.dataContainer.textData} > SW: <Text style={{ fontWeight: "bold" }}>{deviceData?.GSM}   </Text></Text>
                            <Text style={styles.imageConatiner.dataContainer.textData} > SIG: <Text style={{ fontWeight: "bold" }}>{deviceData?.SIG}   </Text></Text>
                            <Text style={styles.imageConatiner.dataContainer.textData} > RUN_HR: <Text style={{ fontWeight: "bold" }}>{deviceData?.RUN_HR} </Text></Text>
                        </View>
                    </View>
                    <View style={styles.buttonConatiner}>
                        <View style={styles.buttonConatiner.buttonsList}><Button title="Start/Stop" color="#37fd12" /></View>
                        <View style={styles.buttonConatiner.buttonsList}><Button title="Auto/Manual" /></View>
                        <View style={styles.buttonConatiner.buttonsList}><Button title="Setting" /></View>
                        <View style={styles.buttonConatiner.buttonsList}><Button title="Refresh" /></View>

                    </View>
                </Provider>
                : <View><Text>no data</Text></View>
            }
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        elevation: 1,
    },
    logoContainer: {
        flex: 1,
        backgroundColor: '#ff9933',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        height: "100%",
        width: "100",
        deviceName: {
            fontSize: 25,
            fontWeight: 'bold',
            paddingLeft: 20
        }
    },
    imageConatiner: {
        flex: 4,
        alignItems: 'center',
        verticalAlign: 'middle',
        alignContent: 'center',
        height: "100%",
        elevation: 1,
        deviceImage: {
            marginTop: 30,
            borderRadius: 50,
            zIndex: 1
        },
        dataContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'space-evenly',
            textData: {
                fontSize: 21,
                width: "40%",
                flexDirection: "column",
            }
        }
    },
    buttonConatiner: {
        flex: 2,
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: "100%",
        flexWrap: 'wrap',
        verticalAlign: 'middle',
        alignContent: 'center',
        buttonsList: {
            width: "40%",
            flexDirection: "column",
            justifyContent: 'space-evenly',
            height: '25%',
            // padding:10,
            // margin:10
        }
    }
});

export default DeviceDashboard;
