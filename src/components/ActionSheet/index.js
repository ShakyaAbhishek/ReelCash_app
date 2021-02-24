import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import styles from "./style";
import Constants from "../../constants";
import Modal from "react-native-modal";
type props = {
  modalVisible: Boolean,
  dismissModalHandler: Object,
  selectedValue: Object,
};

const ActionSheet = ({
  modalVisible,
  dismissModalHandler,
  selectedValue,
}: props) => {

  return (
    <Modal
        style={styles.modalView}
        testID={'modal'}
        onSwipeComplete={dismissModalHandler}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        isVisible={modalVisible}
        customBackdrop={
            <TouchableWithoutFeedback onPress={dismissModalHandler}>
            <View style={{ flex: 1, backgroundColor: "#000000" }} />
            </TouchableWithoutFeedback>
        }
    >
      <SafeAreaView style={styles.container}>
          <View style={styles.upperContainer}>
          <View style={styles.upperHandel} />
          <View style={styles.upperDetailStyle}>
            <Text style={styles.textStyles}>
                Select Image form on of the action
            </Text>
          </View>
          <TouchableOpacity onPress={()=>selectedValue(1)} activeOpacity={0.9} style={styles.buttonsStyle}>
          <Text style={styles.textStyles} >
                Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>selectedValue(2)} activeOpacity={0.9} style={styles.buttonsStyle}>
          <Text style={styles.textStyles} >
                Photo Library
            </Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={dismissModalHandler} activeOpacity={0.9} style={styles.cancelButtonStyle}>
            <Text style={styles.textStyles} >
                Cancel
            </Text>
          </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default ActionSheet;
