import React, { useState } from "react";
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

const PickerInputState = ({
  modalVisible,
  dismissModalHandler,
  selectedValue,
  countryData,
}: props) => {

  const [selectedCountryName, setSelectedCountryName] = useState('USA');

  const renderListItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => selectedValue(item)}>
        <View style={styles.itemStyle}>
          <Text
            style={styles.itemTextStyle}
          >{`${item.state}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderListCounrty = ({ item, index }) => {
    // console.warn(JSON.stringify(item, undefined, 2));
    return (
      // <TouchableOpacity>
      <View style={styles.itemStyle1}>
        {/* <View style={{height:40, marginTop:10, borderBottomColor:Constants.Colors.GreenColor, borderBottomWidth:1}}>
          <Text
            style={styles.itemTextStyle1}
          >{`${item.countryName}`}</Text>
          </View> */}
        {selectedCountryName === item.countryName && <>
          {item.statesName.map(i => {
            return (
              <TouchableOpacity onPress={() => selectedValue({ state: i.state, id: i.id })}>
                <View style={styles.itemStyle}>
                  <Text
                    style={styles.itemTextStyle}
                  >{`${i.state}`}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </>}
        {/* <FlatList 
          // style={styles.flatListStyle}
          data={item.statesName}
          showsVerticalScrollIndicator={false}
          renderItem={renderListItem}
          /> */}
      </View>
      // </TouchableOpacity>
    )
  }

  // const ListHeaderView = () => {
  //   return(

  //   )
  // }

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
        <View style={{ height: 50, width: '100%', flexDirection: 'row', borderBottomColor: Constants.Colors.TextGrayColor, borderBottomWidth: 1 }}>
          <TouchableOpacity onPress={() => setSelectedCountryName('USA')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.CountryHeaderText, { color: selectedCountryName === 'USA' ? Constants.Colors.GreenColor : Constants.Colors.WhiteColor }]}>USA</Text>
          </TouchableOpacity>
          <View style={{ height: 50, width: 2, backgroundColor: Constants.Colors.TextGrayColor }} />
          <TouchableOpacity onPress={() => setSelectedCountryName('Canada')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.CountryHeaderText, { color: selectedCountryName !== 'USA' ? Constants.Colors.GreenColor : Constants.Colors.WhiteColor }]}>CANADA</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          // style={styles.flatListStyle}
          // ListHeaderComponent={ListHeaderView}
          data={countryData}
          showsVerticalScrollIndicator={false}
          renderItem={renderListCounrty}
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

export default PickerInputState;
