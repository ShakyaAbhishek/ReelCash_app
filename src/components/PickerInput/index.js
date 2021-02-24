import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image,
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

const PickerInput = ({
  modalVisible,
  dismissModalHandler,
  selectedValue,
  countryData,
}: props) => {
  const renderListItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => selectedValue(item)}>
        <View style={styles.itemStyle}>
        <View style={{flex:1.5, justifyContent:'center', alignItems:'center'}}>
          <View style={styles.flagImageWrapperStyle}>
            <Image style={{height:'100%', width:'100%', resizeMode:'contain'}} source={{uri: item.flag}} />
          </View>
        </View>
          <View style={{flex:2, justifyContent:'center', }}>
          <Text
            style={styles.itemTextStyle}
          >{`${item.country} (${item.code})`}</Text>
          </View>
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
          <View style={{ flex: 1, backgroundColor: 'transparent' }} />
        </TouchableWithoutFeedback>
      }
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.flatListStyle}
          data={countryData}
          showsVerticalScrollIndicator={false}
          renderItem={renderListItem}
        />
      </SafeAreaView>
      <TouchableOpacity
        onPress={dismissModalHandler}
        activeOpacity={0.8}
        style={styles.closeButtonStyle}
      >
        <Text style={styles.closeButtonTextStyle}>Close</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default PickerInput;
