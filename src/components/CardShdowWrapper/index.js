import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./style";

const CardShdowWrapper = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default CardShdowWrapper;
