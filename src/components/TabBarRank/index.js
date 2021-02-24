//import liraries
import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

type TabProps = {
  goToPage: Object,
  activeTab: number,
};
const TabBarRank = ({ goToPage, activeTab }: TabProps) => {
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
      <View style={styles.flex1}>
        <Tab
          onPressTab={() => goToPage(0)}
          tabLabel={"Nationwide"}
          count={1}
          tabActive={activeTab === 0}
        />
      </View>
      <View style={styles.flex1}>
        <Tab
          onPressTab={() => goToPage(1)}
          tabLabel={"State/Prov"}
          count={1}
          tabActive={activeTab === 1}
        />
      </View>
      <View style={styles.flex1}>
        <Tab
          onPressTab={() => goToPage(2)}
          tabLabel={"Official Rank"}
          count={1}
          tabActive={activeTab === 2}
        />
      </View>
      <View style={styles.flex1}>
        <Tab
          onPressTab={() => goToPage(3)}
          tabLabel={"Fantasy Rank"}
          count={1}
          tabActive={activeTab === 3}
        />
      </View>
    </View>
  );
};

export default TabBarRank;
