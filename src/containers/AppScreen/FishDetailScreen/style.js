import { ScaledSheet } from 'react-native-size-matters';
import Constants from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    flex: 1,
    // margin: '20@ms',
  },
  likeButtonWrapper: {
    height: '55@ms',
    width: '35@ms',
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection:'row',
  },
  plusIconWrapper: {
    height: '30@ms',
    width: '30@ms',
    borderRadius: '15@ms',
    borderWidth: '2@ms',
    borderColor: Constants.Colors.GreenColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fishImageWrapper: {
    height: '195@ms',
    borderRadius: '20@ms',
    margin: '20@ms',
  },
  fishImageWrapper1: {
    height: '195@ms',
    borderRadius: '20@ms',
    width: '339@ms',
    // width:'100%',
  },
  fishImageStyle: { height: '100%', width: '100%', borderRadius: '20@ms' },
  likeCommentWrapper: {
    marginHorizontal: '20@ms',
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCommentTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
    marginHorizontal: '9@ms',
  },
  lableCatchWrapper: {
    marginTop: '10@ms',
    marginHorizontal: '20@ms',
    paddingBottom: '10@ms',
    borderBottomColor: Constants.Colors.TextGrayColor,
    borderBottomWidth: '1@ms',
  },
  lableTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    lineHeight: 18,
    color: Constants.Colors.DarkGreenColor,
  },
  catchDetailWrapper: { marginHorizontal: '20@ms', marginTop: '10@ms', },
  catchDetailInfoIcon: { flexDirection: 'row', marginVertical: '10@ms' },
  flexHalf: { flex: 0.5 },
  flex4: { flex: 4 },
  catchDetailTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  catchDetailTextStyle1: {
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  lableStatisticWrapper: {
    marginTop: '15@ms',
    marginHorizontal: '20@ms',
    paddingBottom: '10@ms',
    borderBottomColor: Constants.Colors.TextGrayColor,
    borderBottomWidth: '1@ms',
  },
  statisticsDetailWrapper: { marginTop: '10@ms', marginHorizontal: '20@ms' },
  leftHeadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '10@ms',
  },
  leftheadingTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: Constants.Colors.WhiteColor,
  },
  rightTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  flexRow: { flexDirection: 'row' },
  marginHorizontal5: { marginHorizontal: '5@ms' },
  locationLableWrapper: {
    marginTop: '15@ms',
    marginHorizontal: '20@ms',
    paddingBottom: '10@ms',
    borderBottomColor: Constants.Colors.TextGrayColor,
    borderBottomWidth: '1@ms',
  },
  locationViewStyle: { height: '164@ms', margin: '20@ms' },
});

export default styles;
