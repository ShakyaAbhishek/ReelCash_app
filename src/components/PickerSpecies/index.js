import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "./style";
import Constants from "../../constants";
import Modal from "react-native-modal";
import country_Code from "../../utilities/countryCode";
type props = {
  modalVisible: Boolean,
  dismissModalHandler: Object,
  selectedValue: Object,
  countryData: Object,
};

const PickerSpecies = ({
  modalVisible,
  dismissModalHandler,
  selectedValue,
  countryData,
}: props) => {
  const renderListItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => selectedValue(item)}>
        <View style={styles.itemStyle}>
          <Text
            style={styles.itemTextStyle}
          >{`${item.value}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      // animationIn={'lightSpeedIn'}
      // animationOut={'lightSpeedOut'}
      animationInTiming={200}
      animationOutTiming={200}
      isVisible={modalVisible}
      customBackdrop={
        <TouchableWithoutFeedback onPress={dismissModalHandler}>
          <View style={{ flex: 1, backgroundColor: "transparent" }} />
        </TouchableWithoutFeedback>
      }
    >
      <SafeAreaView style={[styles.container, { height: 250, borderWidth: 1, borderColor: Constants.Colors.TextGrayColor }]}>
        <FlatList
          style={[styles.flatListStyle, { marginBottom: 10 }]}
          data={countryData}
          showsVerticalScrollIndicator={false}
          renderItem={renderListItem}
        />
      </SafeAreaView>
      {/* <TouchableOpacity
        onPress={dismissModalHandler}
        activeOpacity={0.8}
        style={styles.closeButtonStyle}
      >
        <Text style={styles.closeButtonTextStyle}>Close</Text>
      </TouchableOpacity> */}
    </Modal>
  );
};

export default PickerSpecies;
