import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import {
  HeaderWithTitle,
  CardShdowWrapper,
  TabBar,
  DepositWithDrawList,
} from "../../../components";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Constants from "../../../constants";
import styles from "./style";

type props = {
  navigation: Object,
};
const headerList = [
  {
    id: 0,
    lable: "Deposit",
  },
  {
    id: 1,
    lable: "Withdraw",
  },
  {
    id: 2,
    lable: "Transactions",
  },
];

const DWData = [
  {
    id: 1,
    paymentMethod: "GooglePay",
    amount: "5 USD",
  },
  {
    id: 2,
    paymentMethod: "PayPal",
    amount: "10 USD",
  },
];
const transactionDatas = [
  {
    id: 1,
    paymentType: "Add Money to Wallet",
    transactionId: "#PCCR193",
    amount: "5",
    transactionStatus: "Successful",
    transactionDate: "24 Feb 2020",
  },
  {
    id: 2,
    paymentType: "Add Money to Wallet",
    transactionId: "#PCCR192",
    amount: "10",
    transactionStatus: "Successful",
    transactionDate: "24 Feb 2020",
  },
];

const TransactionScreen = ({ navigation }: props) => {
  const [depositData, setDepositData] = useState([]);
  const [withdrawData, setWithdrawData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    setDepositData(DWData);
    setWithdrawData(DWData);
    setTransactionData(transactionDatas);
  }, []);
  const backPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"Join      "}
        backArrow={true}
        forwordArrow={false}
        backPress={backPress}
      />
      <SafeAreaView style={styles.container1}>
        <View style={styles.headerCardWrapper}>
          <CardShdowWrapper>
            <View style={styles.smallCardWrapper}>
              <Text style={styles.headingWhiteText}>$43</Text>
              <Text style={styles.headerCardTitle}>Deposited</Text>
            </View>
          </CardShdowWrapper>
          <CardShdowWrapper>
            <View style={styles.smallCardWrapper}>
              <Text style={styles.headingWhiteText}>$0</Text>
              <Text style={styles.headerCardTitle}>Winnings</Text>
            </View>
          </CardShdowWrapper>
        </View>
        <View style={styles.detailsWrapper}>
          <ScrollableTabView
            renderTabBar={() => <TabBar headerList={headerList} />}
            style={styles.ScrollableTabStyle}
            prerenderingSiblingsNumber={3}
          >
            <DepositWithDrawList data={depositData} transactionList={false} />
            <DepositWithDrawList data={withdrawData} transactionList={false} />
            <DepositWithDrawList
              data={transactionData}
              transactionList={true}
            />
          </ScrollableTabView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TransactionScreen;
