import React, { useEffect } from "react";
import { View, Text, Platform } from "react-native";
import styles from "./style";
import Constants from "../../constants";
import { WheelPicker } from "react-native-wheel-picker-android";
import { Picker } from "@react-native-community/picker";

type props = {
  selectedValue:String,
};

const countersCount = () => {
  const arr = [];
  for(let i =0; i<=500; i++){
    const x = `${i}.00`;
    const x1 = `${i}.25`;
    const x2 = `${i}.50`;
    const x3 = `${i}.75`;
    arr.push(x,x1,x2,x3);
  }
  return arr;
}

const FishLengthPicker = ({selectedValue}: props) => {
  const [item1, setItem1] = React.useState('0');
  const [item2, setItem2] = React.useState('0');
  const [lengthCount, setlengthCount] = React.useState(countersCount());
  useEffect(()=>{
    
  },[])

  const onValueChange = (value1)=>{
    if (Platform.OS === 'ios'){
      setItem1(value1);
      // console.warn('this is the final value'+`${value1}`)
      selectedValue(`${value1}`);
    }
    else if (Platform.OS === 'android') {
      const data = lengthCount;
      const finalValue = data[value1];
      // console.warn('this is the final value'+`${finalValue}`)
      selectedValue(`${finalValue}`);
    }
     
  }
  return (
    <View style={styles.fishLengthWrapper}>
      {Platform.OS === "ios" ? (
        <>
          <View style={styles.pickerPartWrapper}>
            <Picker
              selectedValue={item1}
              style={styles.pickerStyle}
              itemStyle={styles.pickerItemStyle}
              onValueChange={(itemValue, itemIndex) =>
                onValueChange(itemValue)
              }
            >
              {lengthCount.map((i)=>{
                return(
                  <Picker.Item label={i} value={i} />
                )
              })}
            </Picker>
            <View style={styles.upperDividerStyle} />
            <View style={styles.bottomDividerStyle} />
          </View>
          <View style={styles.pickerPartWrapper}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "ProximaNova-regular",
                  fontWeight: "500",
                  fontSize: 16,
                  color: Constants.Colors.WhiteColor,
                }}
              >
                inches
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.androidPickerWrapper}>
          <View style={styles.androidInnerPicker}>
            <WheelPicker
              data={lengthCount}
              style={styles.androidPickerStyle}
              selectedItemTextSize={18}
              itemTextSize={18}
              selectedItemTextFontFamily={"ProximaNova-Regular"}
              indicatorColor={"white"}
              itemTextColor={Constants.Colors.TextGrayColor}
              selectedItemTextColor={"white"}
              onItemSelected={(item)=>onValueChange(item)}
            />
          </View>
          <View style={styles.androidInnerPicker1}>
          <View style={{ flex: 1, justifyContent: "center", alignItems:'center'}}>
              <Text
                style={{
                  fontFamily: "ProximaNova-regular",
                  fontWeight: "500",
                  fontSize: 16,
                  color: Constants.Colors.WhiteColor,
                }}
              >
                inches
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default React.memo(FishLengthPicker);
