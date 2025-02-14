import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SwipeListView } from "react-native-swipe-list-view";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const DATA = [
  { timestamp: Date.now(), text: "sample text1" },
  { timestamp: Date.now() + 1, text: "sample text2" },
  { timestamp: Date.now() + 2, text: "sample text3" },
];
export default function Index() {
  const [text, setText] = useState("");
  const [data, setData] = useState(DATA);
  const handleDelete = (timestamp) => {
    const res = data.filter((item) => item.timestamp !== timestamp);
    setData([...res]);
  };

  const handleAdd = () => {
    const res = { timestamp: Date.now(), text: text };
    setData([...data, res]);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemWrap}>
        <View style={styles.checkbox}></View>
        <Text style={styles.itemText}>{item.text}</Text>
        <View style={styles.dot}></View>
      </View>
    );
  };
  const renderHiddenItem = ({ item, index }) => {
    return (
      <View style={styles.hiddenitemWrap}>
        <Pressable>
          <Text style={styles.leftIcon}>✏️</Text>
        </Pressable>
        <Pressable onPress={() => handleDelete(item.timestamp)}>
          <Text style={styles.rightIcon}>👌</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <KeyboardAwareScrollView bounces={false}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>🌟To do list</Text>
          </View>
          <View style={styles.listWrap}>
            <SwipeListView
              data={data}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={wp(10)}
              rightOpenValue={-wp(10)}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={(text) => setText(text)}
              placeholder="please wirte the text"
              placeholderTextColor={"#6b6b6b"}
            />
            <Pressable style={styles.addBtn} onPress={handleAdd}>
              <Text style={styles.addBtnText}>+</Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  titleWrap: {
    width: wp(100),
    height: hp(20),
    justifyContent: "center",
    paddingLeft: wp(10),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#fff",
  },
  listWrap: {
    width: wp(100),
    height: hp(62),
  },
  itemWrap: {
    width: wp(90),
    height: wp(90) / 4,
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 2,
    marginHorizontal: wp(5),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(2),
  },
  itemText: {
    color: "#fff",
    width: wp(60),
  },
  checkbox: {
    width: hp(4),
    height: hp(4),
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 4,
    marginHorizontal: wp(3),
    opacity: 0.5,
  },
  dot: {
    width: hp(2),
    height: hp(2),
    backgroundColor: "#ffdd1b",
    borderRadius: 100,
    marginHorizontal: wp(3),
  },
  hiddenitemWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.5),
  },
  leftIcon: {
    fontSize: hp(3),
  },
  rightIcon: {
    fontSize: hp(3),
  },
  inputWrap: {
    width: wp(100),
    height: hp(10),
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#000",
    color: "#fff",
    borderColor: "#fff",
    borderWidth: 2,
    width: wp(60),
    marginLeft: wp(10),
    height: hp(7),
    paddingLeft: wp(3),
    borderRadius: 10,
  },
  addBtn: {
    width: hp(7),
    height: hp(7),
    backgroundColor: "#000",
    borderRadius: 100,
    marginLeft: wp(6),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 2,
  },
  addBtnText: {
    fontSize: hp(4),
    color: "#fff",
  },
});
