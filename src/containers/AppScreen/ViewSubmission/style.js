import { ScaledSheet } from 'react-native-size-matters';
import Constants from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    flex: 1,
    paddingTop: '10@ms',
  },
  contestWrapper: {
    flex: 1,
    paddingTop: '10@ms',
    paddingHorizontal: '9@ms',
  },
  addButtonWrapper: {
    position: 'absolute',
    bottom: '10@ms',
    alignSelf: 'center',
    width: '100%',
  },
  ////card style
  cardWrapper: {
    height: '300@ms',
    width: '45%',
    // flex:1,
    marginHorizontal: '10@ms',
    borderTopLeftRadius: '10@ms',
    borderTopRightRadius: '10@ms',
  },
  cardImageWrapper: {
    height: '110@ms',
    borderTopLeftRadius: '10@ms',
    borderTopRightRadius: '10@ms',
  },
  cardImageStyle: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: '10@ms',
    borderTopRightRadius: '10@ms',
  },
  cardDetailWrapper: {
    borderColor: Constants.Colors.DarkGreenColor,
    borderWidth: '1@ms',
    borderTopWidth: 0,
    borderBottomLeftRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    padding: '15@ms',
  },
  contestNameTest: {
    fontSize: 14,
    fontFamily: 'ProximaNova-Regular',
    lineHeight: 18,
    fontWeight: 'bold',
    color: Constants.Colors.WhiteColor,
  },
  detailTextStyle: {
    fontSize: 11,
    fontFamily: 'ProximaNova-Regular',
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  bottomButtonWrapper: {
    flexDirection: 'row',
    marginTop: '5@ms',
  },
  likeButtonWrapper: {
    height: '50@ms',
    width: '32@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeCommentWrapper: { flexDirection: "row", alignItems: "center" },
  likeTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 12,
    color: Constants.Colors.WhiteColor,
    marginHorizontal: '9@ms',
  },
  commentTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 12,
    color: Constants.Colors.WhiteColor,
    marginLeft: '9@ms',
  },
  bluePointStyle: {
    height: '4@ms',
    width: '4@ms',
    borderRadius: '2@ms',
    backgroundColor: Constants.Colors.BlueColor,
    marginBottom: '10@ms',
    marginLeft: '2@ms',
  },
  noDataTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 24,
    lineHeight: 24,
    color: Constants.Colors.GreenColor,
    // fontWeight: 'old,
  }
});

export default styles;
