import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import Constants from "../../constants";

type Props = {
  textInputName: String,
  placeHolder: String,
  Required: Boolean,
  changeText: Object,
  secureEntry: Object,
  secure: Boolean,
  typeOfKeyBoard: String,
  onError: String,
};

const PasswordTextInput = ({
  textInputName,
  placeHolder,
  Required,
  changeText,
  secureEntry,
  secure,
  typeOfKeyBoard,
  onError,
}: Props) => {
  const [secureEntryData, setsecureEntryData] = useState(secure)
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {textInputName}{" "}
        {Required && (
          <Text style={[styles.titleText, styles.greenText]}>*</Text>
        )}{" "}
      </Text>
      <View>
        <TextInput
          placeholderTextColor={Constants.Colors.TextGrayColor}
          placeholder={placeHolder}
          style={styles.placeholderStyle}
          secureTextEntry={secureEntryData}
          keyboardType={typeOfKeyBoard}
          onChangeText={(text) => changeText(text)}
        />
        <TouchableOpacity
          onPress={() => setsecureEntryData(!secureEntryData)}
          activeOpacity={0.8}
          style={styles.EyeIconStyle}
        >
          <Image
            style={[
              styles.eyeStyleIcon,
              { tintColor: secureEntryData ? "white" : "gray" },
            ]}
            source={Constants.Images.EyeHideIcon}
          />
        </TouchableOpacity>
      </View>
      {onError ? (
        <Text style={styles.errorTextStyle}>{`*${onError}`}</Text>
      ) : (
          <Text>{onError}</Text>
        )}
    </View>
  );
};

//make this component available to the app
export default PasswordTextInput;
