import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    Image,
    Text,
    FlatList,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import Constants from "../../../constants";
import {
    Header,
    BorderButton,
    LeaderBoardCard,
    ColorButton,
} from "../../../components";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user-actions-types";
import { openDatabase } from 'react-native-sqlite-storage';
import moment from "moment";
import { useFocusEffect } from '@react-navigation/native';

type props = {
    navigation: Object,
};

const ViewSubmission = ({ navigation, route }: props) => {
    const { id } = route.params
    const [catchFishData, setCatchFishData] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useFocusEffect(React.useCallback(() => {
        apiCallingFunction(id);
    }, []))


    const apiCallingFunction = (user_id) => {
        const data = {
            id: user_id,
        }
        dispatch(
            userActions.getOngoingRankingList({
                data,
                callback: ({ result, error }) => {
                    if (!error) {
                        if (result) {
                            const { ongoing_catch_details } = result.data;
                            setCatchFishData(ongoing_catch_details);
                        }
                    }
                }
            })
        )
    }

    const priceButton = () => {
        navigation.navigate("MyStatisticsScreen");
    };

    const profileIconPress = () => {
        navigation.navigate("ProfileScreen", { otherUserView: false });
    };

    const addButton = () => {
        navigation.navigate("LiveWellScreen");
    };

    const onPressLike = (id) => {
        const { userData } = user;
        const data = {
            user_id: userData.id,
            catch_id: id,
        };
        dispatch(
            userActions.catchLike({
                data,
                callback: ({ result, error }) => {
                    if (!error) {
                        if (result) {
                            apiCallingFunction();
                        }
                    }
                }
            })
        )
    }

    const renderItems = ({ item, index }) => {
        return (
            <View style={styles.cardWrapper}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        navigation.navigate("FishDetailScreen", { fishName: item.species, fishData: item.id })
                    }
                >
                    <View style={styles.cardImageWrapper}>
                        <Image
                            resizeMode={"cover"}
                            style={styles.cardImageStyle}
                            source={{ uri: item.catch_images[0].images }}
                        />
                    </View>
                    <View style={styles.cardDetailWrapper}>
                        <Text numberOfLines={1} style={styles.contestNameTest}>{item.species}</Text>
                        <Text
                            style={styles.detailTextStyle}
                        >{`Length: ${item.fish_length} inch`}</Text>
                        <Text numberOfLines={1} style={styles.detailTextStyle}>{`State: ${item.state}`}</Text>
                        <Text
                            numberOfLines={1}
                            style={styles.detailTextStyle}
                        >{`Points: ${item.points} pts`}</Text>
                        <Text
                            style={styles.detailTextStyle}
                        >{`Date: ${moment(item.date).format('DD MMM YYYY')}`}</Text>
                        {item.catch_tournament.length > 0 ? (
                            <Text
                                numberOfLines={1}
                                style={styles.detailTextStyle}
                            >{`Entered: ${item.catch_tournament.length} Tournaments`}</Text>
                        ) : (
                                <Text style={styles.detailTextStyle}>{`   `}</Text>
                            )}
                    </View>
                </TouchableOpacity>
                <View style={styles.bottomButtonWrapper}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onPressLike(item.id)}
                    >
                        <View style={styles.likeCommentWrapper}>
                            <ImageBackground
                                source={Constants.Images.BlueRoundShadow}
                                style={styles.likeButtonWrapper}
                            >
                                <Image source={Constants.Images.HeartIcon} />
                            </ImageBackground>
                            <Text style={styles.likeTextStyle}>{item.no_of_likes}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("CommentsScreen", { catch_id: item.id, fish_img: item.catch_images[0].images, species_name: item.species })}
                    >
                        <View style={styles.likeCommentWrapper}>
                            <ImageBackground
                                style={styles.likeButtonWrapper}
                                source={Constants.Images.BlueRoundShadow}
                            >
                                <Image source={Constants.Images.MsgWhiteIcon} />
                            </ImageBackground>
                            <Text style={styles.commentTextStyle}>{item.no_of_comments}</Text>
                            <View style={styles.bluePointStyle} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const EmptyListComponet = () => {
        return (
            <View style={{ height: '100%', alignSelf: 'center', marginTop: '50%' }}>
                {/* <Text style={[styles.noDataTextStyle, { textAlign: 'center' }]}>Sorry!</Text> */}
                <Text style={styles.noDataTextStyle}>Want to see how you stack up in the Fantasy Rankings? Just add your catches here!</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Header
                    pressLeftButton={priceButton}
                    profileIconPress={profileIconPress}
                />
                <View style={styles.container1}>
                    {/* <LeaderBoardCard navigation={navigation} /> */}
                    <View style={styles.contestWrapper}>
                        <FlatList
                            data={catchFishData}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            renderItem={renderItems}
                            keyExtractor={(item) => item.id}
                            ListEmptyComponent={EmptyListComponet}
                        />
                    </View>
                    <View style={styles.addButtonWrapper}>
                        <ColorButton
                            ButtonWidth={164}
                            OnPressButton={addButton}
                            ButtonText={"+"}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default ViewSubmission;
