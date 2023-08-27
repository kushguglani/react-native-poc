import React, { useContext } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import { useSelector, useDispatch } from 'react-redux';

const DeviceList = ({ navigation }) => {
  const devices = useSelector(state => state.devices);

  return (
    <>
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
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};


const styles = StyleSheet.create({});

export default DeviceList;
