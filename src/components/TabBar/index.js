//import liraries
import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

type TabProps = {
  goToPage: Object,
  activeTab: number,
  headerList: Object,
};

const TabBar = ({ goToPage, activeTab, headerList }: TabProps) => {
  const Tab = ({ onPressTab, tabLabel, tabActive }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressTab}
      style={styles.flex1}
    >
      <View style={styles.flexCenter}>
        <Text style={[styles.tabText, tabActive && styles.whiteColor]}>
          {tabLabel}
        </Text>
      </View>
      {tabActive && <View style={styles.activeTabBottom} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabWrapper}>
      {headerList.map((item, index) => {
        return (
          <View style={styles.flex1}>
            <Tab
              onPressTab={() => goToPage(index)}
              tabLabel={item.lable}
              count={1}
              tabActive={activeTab === index}
            />
          </View>
        );
      })}
    </View>
  );
};

export default TabBar;
