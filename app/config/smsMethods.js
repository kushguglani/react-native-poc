import { NativeModules } from 'react-native';

import { PermissionsAndroid } from 'react-native';

let DirectSms = NativeModules.DirectSms;

export const sendDirectSms = async (mobileNumber) => {
    console.log(mobileNumber);
    const bodySMS="Test Message fro Kush vale-kg life-good";
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
            const granted2 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
                {
                    title: 'RECEIVE SMS App Sms Permission',
                    message:
                        'RECEIVE SMS App needs access to your inbox ' +
                        'so you can RECEIVE messages in background.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
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