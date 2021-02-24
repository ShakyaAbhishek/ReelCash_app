import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import styles from "./style";
import Constants from "../../constants";


type props = {
  onPressOperatorCard: Object,
  data: Object,
  loaderShow: Boolean,
};

const HomeOperatorCardSkeleton = () => {
  return (
    <View style={styles.cardWrapper}>
      <View style={[styles.imageCardWrapper, {justifyContent:'center', alignItems:'center', backgroundColor:Constants.Colors.GrayColor}]}>
        <ActivityIndicator size={'small'} color={Constants.Colors.GreenColor} />
      </View>
      <View style={[styles.cardDetailWrapper, { justifyContent:'center', alignItems:'center'}]}>
        <ActivityIndicator size={'small'} color={Constants.Colors.GrayColor} />
      </View>
    </View>
  )
}

const HomeOperatorCard = ({ onPressOperatorCard, data, loaderShow }: props) => {
  const { operator_name, no_of_tournaments, operator_logo, operator_id, no_of_private_tournaments } = data;
  return (
    <View>
      {loaderShow === true ?
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressOperatorCard(operator_id)}
          style={styles.cardWrapper}
        >
         
          <View style={styles.imageCardWrapper}>
            <Image
              style={styles.cardImageStyle}
              source={
                operator_logo == ""
                  ? Constants.Images.DummyImage
                  : { uri: operator_logo }
              }
            />
          </View>
          <View style={styles.cardDetailWrapper}>
            <Text style={styles.cardHeadingText}>{operator_name}</Text>
            <Text style={styles.cardDetailText}>
              Tournaments: #{no_of_tournaments}
            </Text>
            {no_of_private_tournaments==no_of_tournaments && <View style={{position:'absolute', zIndex:1, top:5, right:5}}><Text style={[styles.cardDetailText, {color:Constants.Colors.BlueColor}]}>Private</Text></View>}
          </View>
          
        </TouchableOpacity>
        :
        <HomeOperatorCardSkeleton />
      }

    </View>
  );
};

export default React.memo(HomeOperatorCard);
