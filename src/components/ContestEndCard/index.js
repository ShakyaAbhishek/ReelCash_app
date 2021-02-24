import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { ColorButton, BorderButton } from "../../components";
import Constants from "../../constants";
import PriceDetailWrapper from "../PriceDetailWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../actions/user-actions-types";
import styles from "./style";
import {numWithComma} from '../../utilities/validation';

type props = {
  contestName: String,
  dateTime: String,
  pricePool: String,
  firstPrice: String,
  entryFee: String,
  tournamentType: String,
  tournamentLocation: String,
  tournamentSpecies: String,
  joinStatus: String,
  apiResult: Boolean,
  constest_id: Number,
  tournament_Image:String,
};

const ContestEndCard = ({
  contestName,
  dateTime,
  upcoming,
  pricePool,
  firstPrice,
  entryFee,
  tournamentType,
  tournamentLocation,
  tournamentSpecies,
  joinStatus,
  apiResult,
  constest_id,
  tournament_Image
}: props) => {
  const dispatch = useDispatch();
  const [showFullDetail, setShowFullDetail] = useState(false);
  const [winnerListData, setWinnerListData] = useState([]);
  const [userFirstRanking, setUserFirstRanking] = useState({});

  const onPressRankingFunction = () => {
    const data = {
      id: constest_id,
    };
    dispatch(
      userActions.getCompleteRankingList({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              console.warn(JSON.stringify(result, undefined, 2));
              const { ongoing_catch_details } = result.data;
              const rankingListData = [...ongoing_catch_details];
              // const fistUserRanking = rankingListData[0];
              const dummy_Data = [];
              rankingListData.map((i) => {
                const obj = {
                  ...i[0],
                };
                dummy_Data.push(obj);
              });
              const FirstrankiUser = dummy_Data[0]; 
              setUserFirstRanking({...FirstrankiUser});
              // console.warn("fdsfsd fsdf saf dsafsd",JSON.stringify(FirstrankiUser));
              const listData = dummy_Data.shift();
              setWinnerListData([...dummy_Data]);
              setShowFullDetail(true);
            }
          }
        },
      })
    );

    // setShowFullDetail(!showFullDetail);
  };

  const renderItems = ({ item, index }) => {
    return (
      <View style={styles.listItemWrapper}>
        <View
          style={[
            item.icon ? styles.topPosWrapper : { flex: 1, paddingLeft: 7 },
          ]}
        >
          <Text
            style={[styles.greenPosText, item.id === 3 && styles.textColorBlue]}
          >
            {index + 2 < 10 ? `0${index + 2}` : index}
          </Text>
          {item.approval_status === 1 && <Image source={Constants.Images.FishBadgeGreenIcon} />}
        </View>
        <View style={styles.flex1half}>
          <Text
            style={[
              styles.listItemTextWhite,
              item.id === 3 && styles.textColorBlue,
            ]}
          >
            {item.user_name}
          </Text>
        </View>
        <View style={styles.flex1}>
          <Text
            style={[
              styles.listItemTextWhite,
              item.id === 3 && styles.textColorBlue,
            ]}
          >
            {item.points}
          </Text>
        </View>
        <View style={styles.flex1half}>
          <Text
            style={[
              styles.listItemTextWhite,
              item.id === 3 && styles.textColorBlue,
            ]}
          >
            {item.species}
          </Text>
        </View>
        <View style={styles.flex1}>
          <Text
            style={[
              styles.listItemTextWhite,
              item.id === 3 && styles.textColorBlue,
            ]}
          >
            {item.fish_length}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={1} style={styles.container}>
        <View style={styles.cardHeaderStyle}>
          <View style={styles.blueFishImageStyle}>
            <Image
              style={styles.fishImage}
              source={Constants.Images.BlueFishIcon}
            />
          </View>
          <View style={styles.contestNameWrapper}>
            <Text style={styles.contestTextStyle}>{contestName}</Text>
            <Text style={styles.dateTimeTextStyle}>{dateTime}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={showFullDetail === true? ()=>setShowFullDetail(false) : onPressRankingFunction}
            style={styles.plusButtonWrapper}
          >
            <View>
              {showFullDetail === false ? (
                <Image source={Constants.Images.WhitePlusIcon} />
              ) : (
                <View style={styles.minusButtonWrapper}>
                  <Text style={styles.minusButtonText}>-</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.contestDetailWrapper}>
          <View style={styles.upperTextWrapper}>
            <View style={styles.flexWithCenter}>
              <Text style={styles.whiteHeadingText}>Price Pool</Text>
              <Text style={styles.greenHeadingText}>$ {numWithComma(pricePool)}</Text>
            </View>
            <View style={styles.flexWithCenter}>
              <Text style={styles.whiteHeadingText}>First Price</Text>
              <Text style={styles.greenHeadingText}>$ {numWithComma(firstPrice)}</Text>
            </View>
            <View style={styles.flexWithCenter}>
              <Text style={styles.whiteHeadingText}>Entry Fee</Text>
              <Text style={styles.greenHeadingText}>$ {numWithComma(entryFee)}</Text>
            </View>
          </View>
          {!showFullDetail && (
            <View style={styles.bottomTextWrapper}>
              <View style={styles.flexWithCenter}>
                <Text style={styles.whiteHeadingText}>Type</Text>
                <Text style={styles.greenHeadingText}>{tournamentType}</Text>
              </View>
              <View style={styles.flexWithCenter}>
                <Text style={styles.whiteHeadingText}>Location</Text>
                <Text style={styles.greenHeadingText}>
                  {tournamentLocation}
                </Text>
              </View>
              <View style={styles.flexWithCenter}>
                <Text style={styles.whiteHeadingText}>Species</Text>
                <Text style={styles.greenHeadingText}>{tournamentSpecies}</Text>
              </View>
            </View>
          )}
        </View>
        {showFullDetail && (
          <>
            <View style={styles.tournamentImageWrapper}>
              <ImageBackground
                style={styles.tImageHeightWidth}
                imageStyle={styles.tImageStyle}
                source={{uri:tournament_Image}}
              ></ImageBackground>
            </View>
            <View style={styles.winnerTagWrapper}>
              <PriceDetailWrapper
                leftWhite={true}
                rightGreen={true}
                Icon={Constants.Images.BadgeBlackIcon}
                firstText={"Winner"}
              />
            </View>
            <View style={styles.listHeadingWrapper}>
              <View style={styles.flex1}>
                <Text style={styles.listHeadingTextStyle}>Pos.</Text>
              </View>
              <View style={styles.flex1half}>
                <Text style={styles.listHeadingTextStyle}>Name</Text>
              </View>
              <View style={styles.flex1}>
                <Text style={styles.listHeadingTextStyle}>Points</Text>
              </View>
              <View style={styles.flex1half}>
                <Text style={styles.listHeadingTextStyle}>Fish</Text>
              </View>
              <View style={styles.flex1}>
                <Text style={styles.listHeadingTextStyle}>Length</Text>
              </View>
            </View>
            <View style={styles.listItemWrapper}>
              <View style={userFirstRanking.approval_status === 1?styles.topPosWrapper:styles.topPosWrapper1}>
                <Text style={styles.greenPosText}>01</Text>
                {userFirstRanking.approval_status === 1 && <Image source={Constants.Images.FishBadgeGreenIcon} />}
              </View>
              <View style={styles.flex1half}>
                <Text style={styles.listItemTextWhite}>{userFirstRanking.user_name}</Text>
              </View>
              <View style={styles.flex1}>
                <Text style={styles.listItemTextWhite}>{userFirstRanking.points}</Text>
              </View>
              <View style={styles.flex1half}>
                <Text style={styles.listItemTextWhite}>{userFirstRanking.species}</Text>
              </View>
              <View style={styles.flex1}>
                <Text style={styles.listItemTextWhite}>{userFirstRanking.fish_length} in</Text>
              </View>
            </View>
            {winnerListData.length !== 0 && <View>
              <View style={styles.runnerUpWrapper}>
                <PriceDetailWrapper
                  leftWhite={false}
                  rightGreen={false}
                  Icon={Constants.Images.MadleWhiteIcon}
                  firstText={"Runner Ups"}
                />
              </View>
              <View style={styles.listHeadingWrapper1}>
                <View style={styles.flex1}>
                  <Text style={styles.listHeadingTextStyle}>Pos.</Text>
                </View>
                <View style={styles.flex1half}>
                  <Text style={styles.listHeadingTextStyle}>Name</Text>
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.listHeadingTextStyle}>Points</Text>
                </View>
                <View style={styles.flex1half}>
                  <Text style={styles.listHeadingTextStyle}>Fish</Text>
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.listHeadingTextStyle}>Length</Text>
                </View>
              </View>
              <FlatList
                data={winnerListData}
                showsVerticalScrollIndicator={false}
                renderItem={renderItems}
                keyExtractor={(item) => item.id}
              />
            </View>}
          </>
        )}
        {!showFullDetail && (
          <View style={styles.buttonsWrapper}>
            <ColorButton
              ButtonWidth={165}
              OnPressButton={onPressRankingFunction}
              ButtonText={"Rankings"}
            />
            <BorderButton
              ButtonWidth={165}
              ButtonTitle={joinStatus === 1 ? "Already Joined" : "Joined"}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(ContestEndCard);
