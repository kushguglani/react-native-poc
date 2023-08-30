import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyComponent = ({ navigation }) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <View
            style={{
                position: "absolute",
                width: 20,
                right: 40,
                top: '30%',
            }}>
            <Menu
                style={{
                    top: 0,
                    width: 180,
                    right: 20
                }}
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={<Button
                    onPress={() => setVisible(true)}>
                    <MaterialCommunityIcons
                        name="dots-vertical"
                        size={20}
                    />
                </Button>}>
                <Menu.Item onPress={() => navigation.navigate('AddDevice')} title="Add Device" />
                <Menu.Item onPress={() => navigation.navigate('Devices')} title="Device List" />
                <Divider />
                <Menu.Item onPress={() => navigation.navigate('Signin', { name: 'Jane' })} title="LogOut" />
            </Menu>
        </View>
    );
};

export default MyComponent;