import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import styles from "./style";
import Constants from "../../constants";

type props = {
  data: Object,
  transactionList: Boolean,
};

const DepositWithDrawList = ({ data, transactionList }: props) => {
  const renderDWList = ({ item, index }) => {
    return (
      <View style={styles.dwCardWrapper}>
        <Image source={Constants.Images.BlueFishIcon} />
        <View style={styles.dwRightWrapper}>
          <View style={styles.dwDetailWrapper}>
            <Text style={styles.dwMethodTextStyle}>{item.paymentMethod}</Text>
            <Text style={styles.dwAmountTextStyle}>{item.amount}</Text>
          </View>
          <View style={styles.dwAmountWrapper}>
            <Text style={styles.dwAmountBigTextStyle}>{item.amount}</Text>
          </View>
        </View>
      </View>
    );
  };

  const rendetTransactionList = ({ item, index }) => {
    // console.warn(item);
    return (
      <View style={styles.transactionListWrapper}>
        <View style={styles.tHeaderWrapper}>
          <View style={styles.tDateWrapper}>
            <Text style={styles.tDateTextStyle}>{item.transactionDate}</Text>
          </View>
          <View style={styles.tHeaderLineStyle} />
        </View>
        <View style={styles.tDetailWrapper}>
          <View style={styles.tLeftWrapper}>
            <Text style={styles.tPaymentTypeTextStyle}>{item.paymentType}</Text>
            <Text
              style={styles.tPaymentIdTextStyle}
            >{`ID: ${item.transactionId}`}</Text>
          </View>
          <View style={styles.tRightWrapper}>
            <Text style={styles.tAmountTextStyle}>{`+ ${item.amount}`}</Text>
            <View style={styles.tPayStatusWrapper}>
              <Text style={styles.tPaymentTextStyle}>
                {item.transactionStatus}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={transactionList ? rendetTransactionList : renderDWList}
      />
    </View>
  );
};

export default DepositWithDrawList;
