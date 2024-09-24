import { View, Text } from 'react-native';

import { COLOR } from './color';

export default ({
  NEWCOLOR,
  busInfo,  //  remainedTimeText = "도착정보없음" -> 일 때 true
  remainedTimeText,   // 8분 0초, 곧 도착, 도착 정보 없음
  numOfRemainedStops,  // 1, 2, 3, 15 등
  seatStatusText       // 1석, 여유, 보통
}) => {
  if (!busInfo) return <Text style={{color: COLOR.GRAY_2}}>도착 정보 없음</Text>;
  return (
    <View style={{flexDirection: "row", alignItems:"center"}}>
      <Text style={{color: NEWCOLOR.BLACK_WHITE, marginRight: 10}}>{remainedTimeText}</Text>
      <View style={{flexDirection: 'row' ,alignItems: 'center',borderWidth: 0.5, borderColor:NEWCOLOR.GRAY_1_GRAY_4, borderRadius: 3, padding: 2}}>
        <Text style={{color: NEWCOLOR.GRAY_3_GRAY_2, marginRight: 3}}>{numOfRemainedStops}번째전</Text>
        <Text style={{color: COLOR.CORAL}}>{seatStatusText}</Text>
      </View>
    </View> 
  )
};