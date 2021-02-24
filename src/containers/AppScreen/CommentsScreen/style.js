import { ScaledSheet } from 'react-native-size-matters';
import Constants from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    flex: 1,
  },
  leaderBoardWrapper: {
    marginTop: '15@ms',
  },
  postNameWrapper: {
    marginTop: '25@ms',
    marginBottom: '5@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postNameTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    lineHeight: 18,
    fontSize: 17,
    fontWeight: '500',
    color: Constants.Colors.WhiteColor,
  },
  imageStyleWrapper: { height: '194@ms', width: '100%', marginTop: '20@ms' },
  imageStye: { height: '100%', width: '100%', resizeMode: 'cover' },
  likeButtonWrapper: {
    height: '55@ms',
    width: '35@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeIconCountWrapper: {
    marginHorizontal: '18@ms',
    paddingVertical: '10@ms',
    borderBottomColor: Constants.Colors.GrayColor,
    borderBottomWidth: '1@ms',
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCommentCountText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
    marginLeft: '9@ms',
  },
  commentCountWrapper: {
    marginHorizontal: '18@ms',
    paddingVertical: '10@ms',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsWrapper: { marginHorizontal: '20@ms' },
  sendBoxWrapper: {
    paddingTop: '5@ms',
    marginHorizontal: '20@ms',
    flexDirection: 'row',
    marginBottom: '10@ms',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    // position:'absolute',
    // bottom:0
  },
  typeBoxWrapper: {
    height: '40@ms',
    flex: 1,
    borderRadius: '18@ms',
    borderColor: Constants.Colors.WhiteColor,
    backgroundColor: 'rgba(216,216,216,0.08)',
    borderWidth: '1@ms',
    // justifyContent: 'center',
    paddingHorizontal: '10@ms',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  sendButtonWrapper: {
    height: '36@ms',
    width: '36@ms',
    marginLeft: '15@ms',
    backgroundColor: Constants.Colors.BlueColor,
    borderRadius: '18@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
