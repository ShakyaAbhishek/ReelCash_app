import React from "react";
import { View, Text, Image, Platform } from "react-native";
import styles from "./style";
import CardShdowWrapper from "../CardShdowWrapper";
import Constants from "../../constants";
import moment from "moment";
type props = {
  data: Object,
}

const ReceiveCommentCard = ({data}:props) => {
  const {comment,images,user_name, created_at, profile_picture} =data;
  return (
    <CardShdowWrapper>
      <View style={styles.talkBubble}>
        <View style={styles.talkBubbleSquare}>
          <View style={styles.flexRow}>
            <View style={styles.userImageWrapper}>
              <Image
                source={{uri: profile_picture}}
                style={styles.userImageStyle}
              />
            </View>
            <View style={styles.commentBodyWrapper}>
              <Text style={styles.userNameTextStyle}>{user_name}</Text>
              <Text style={styles.commentTextStyle}>
                {comment}
              </Text>
              {images !== '' && <View style={styles.commentImageStyle}>
                <Image
                  source={Constants.Images.DummyImage}
                  style={styles.imageCommentStyle}
                />
              </View>}
              <Text style={styles.timeDateTextStyle}>{`${moment(created_at).format('DD MMM YYYY')} @ ${moment(created_at).format('HH:mm')}`}</Text>
            </View>
          </View>
        </View>
       { Platform.OS === 'ios' ? <View style={styles.talkBubbleTriangle} /> :
       <View style={styles.talkBubbleTriangle1}><Image style={{transform:[{rotate:'180deg'}]}} source={Constants.Images.ArrowDummyIcon}/></View>}
      </View>
    </CardShdowWrapper>
  );
};

export default ReceiveCommentCard;
