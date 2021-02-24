import Constants from "../../constants";
import styles from "./style";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import moment from "moment";
import { Alert } from "react-native";

type counterProps = {
  counterType: String,
  counts: Number,
}

const CountRoundWrapper = ({ counterType, counts }: counterProps) => {
  return (
    <View style={styles.flexCenter}>
      <View
        style={styles.counterUpperWrapper}
      >
        <View
          style={styles.counterInnerWrapper}
        >
          <Text
            style={styles.countTextStyle}
          >
            {counts <= 9 ? `0${counts}` : counts}
          </Text>
        </View>
      </View>
      <Text
        style={styles.countTypeStyle}
      >
        {counterType}
      </Text>
    </View>
  )
}


const calculateTimeLeft = (time) => {
  const timeStamp = moment(time).valueOf();
  const difference = timeStamp - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

type Props = {
  style: Object,
  time: string,
  onCalledDeadline: Object,
  screen: string,
};

const Counter = ({ onCalledDeadline, time, screen, style }: Props) => {
  // 2020-06-24 14:03:00
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(time)
  );
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    // console.log('use effect')
    const id = setTimeLeftIntervally();
    return () => clearInterval(id);
  });

  const setTimeLeftIntervally = () => {
    const id = setInterval(() => {
      const tmpTimeLeft = calculateTimeLeft(time);
      setTimeLeft(tmpTimeLeft);
      // console.log('timeLeft.hours  : '+JSON.stringify(tmpTimeLeft))
      if (tmpTimeLeft.hours === undefined && !alert) {
        clearInterval(id);
        alertForDeadline();
      }
    }, 1000);
    return id;
  };

  const alertForDeadline = () => {
    setAlert(true);
    if (screen === "") {
      onCalledDeadline();
    } else {
      console.warn('tournament start');
    }
  };

  if (timeLeft.hours === undefined)
    return (<View>
      <View style={styles.counterWrapperStyle}>
      <CountRoundWrapper counterType={'Days'} counts={0} />
      <CountRoundWrapper counterType={'Hours'} counts={0} />
      <CountRoundWrapper counterType={'Minutes'} counts={0} />
      <CountRoundWrapper counterType={'Seconds'} counts={0} />
    </View>
    {/* <Text style={{fontSize:24, fontWeight:'bold', color:'#ffffff', textAlign:'center'}}>Tournament is started</Text> */}
    </View>);

  const { days, hours, minutes, seconds } = timeLeft;
  return (
    <View style={styles.counterWrapperStyle}>
      <CountRoundWrapper counterType={'Days'} counts={days} />
      <CountRoundWrapper counterType={'Hours'} counts={hours} />
      <CountRoundWrapper counterType={'Minutes'} counts={minutes} />
      <CountRoundWrapper counterType={'Seconds'} counts={seconds} />
    </View>
  );
};

// Counter.defaultProps = {
//   style: {},
//   screen: "",
// };

export default React.memo(Counter);
