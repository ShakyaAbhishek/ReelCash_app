import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./style";
import Constants from "../../constants";

type Props = {
  textInputName: String,
  placeHolder: String,
  Required: Boolean,
  promocode: Boolean,
  changeText: Object,
  typeOfKeyBoard: String,
  onError: String,
};

const CustomTextInput = ({
  textInputName,
  placeHolder,
  Required,
  promocode,
  changeText,
  typeOfKeyBoard,
  onError,
  value
}: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          {textInputName}
          {Required && (
            <Text style={[styles.titleText, styles.greenText]}>*</Text>
          )}
        </Text>
        <View style={styles.mainWrapper} >
          <View
            style={promocode === true ? styles.applyField : styles.textField}
          >
            <View style={styles.flex1}>
              <TextInput
                placeholderTextColor={Constants.Colors.TextGrayColor}
                placeholder={placeHolder}
                style={[
                  styles.placeholderStyle,
                  promocode !== true && styles.borderBottomStyle,
                  { borderBottomColor: onError != "" ? "white" : "white" },
                ]}
                keyboardType={typeOfKeyBoard}
                value={value}
                onChangeText={(text) => changeText(text.trim())}
              />
            </View>
            {promocode === true && (
              <View style={styles.promocodeWrapper}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </View>
            )}
          </View>
        </View>
        {onError ? (
          <Text style={styles.errorTextStyle}>{`*${onError}`}</Text>
        ) : (
            <Text>{onError}</Text>
          )}
      </View>
    </>
  );
};

export default CustomTextInput;
