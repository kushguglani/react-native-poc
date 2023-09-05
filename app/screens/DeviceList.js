import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity,Button } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeDevice } from "../redux/actions/action";
import Dialog from "react-native-dialog";
const DeviceList = ({ navigation }) => {
  const devices = useSelector(state => state.devices);
  const [visiblePrompt, setVisiblePrompt] = useState(false);
  const [deleteId, setDeletedId] = useState('');
  const dispatch = useDispatch();
  const deleteDevice = () => {
    dispatch(removeDevice(deleteId))
    setVisiblePrompt(false)
  }
  const onDeleteDevice = (num) => {
    setDeletedId(num)
    setVisiblePrompt(true)
  }
  return (
    <>
      {(devices && devices.length > 0) ?
        <FlatList
          data={devices}
          keyExtractor={(item) => item.number}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Dashboard", { data: item })
                }
              >
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>{item.number}</ListItem.Title>
                  </ListItem.Content>
                  <MaterialCommunityIcons
                    name="open-in-new"
                    size={20}
                    title="open"
                  />
                  <MaterialCommunityIcons
                    name="pencil"
                    disabled
                    size={20}
                    title="edit"
                  />
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    title="delete" onPress={() => onDeleteDevice(item.number)}
                  />
                </ListItem>
              </TouchableOpacity>
            );
          }}
        />
        :
        <View>
          <Text style={styles.noDevices}>No Device Found</Text>
          <Button onPress={() =>
            navigation.navigate("AddDevice")
          } title="Add A Device" /></View>
      }
      <Dialog.Container visible={visiblePrompt}>
        <Dialog.Title>Device delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this device? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setVisiblePrompt(false)} />
        <Dialog.Button label="Delete" onPress={deleteDevice} />
      </Dialog.Container>

    </>
  );
};


const styles = StyleSheet.create({
  noDevices:{
    fontSize:30,
    textAlign:'center',
    padding:20
  }
});

export default DeviceList;
