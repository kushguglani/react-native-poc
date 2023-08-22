import { NativeModules } from 'react-native';

import { PermissionsAndroid } from 'react-native';

let DirectSms = NativeModules.DirectSms;

export const sendDirectSms = async (mobileNumber) => {
    console.log(mobileNumber);
    const bodySMS="test message to check working or not";
    if (mobileNumber) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SEND_SMS,
                {
                    title: 'Send SMS App Sms Permission',
                    message:
                        'Send SMS App needs access to your inbox ' +
                        'so you can send messages in background.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log({ granted })
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                DirectSms.sendDirectSms(mobileNumber, bodySMS);
                alert('SMS sent');
            } else {
                alert('SMS permission denied');
            }
        } catch (error) {
            console.warn(error);
            alert(error);
        }
    }
};