import { View, Text } from 'react-native';
import BookmarkButton from './BookmarkButton';

import { COLOR } from './color';
import AlarmButton from './AlarmButton';
import NextBusInfo from './NextBusInfo';

export default ({
  NEWCOLOR,
  isBookmarked,
  onPressBoomark,
  num,
  directionDescription,
  numColor,
  processedNextBusInfos
}) => {
  return (
    <View style={{flexDirection: "row", height: 75, backgroundColor: NEWCOLOR.WHITE_BLACK}}>
      <View style={{flex:0.85, flexDirection:"row", alignItems: 'center'}}>
        {/* 북마크 */}
        <BookmarkButton 
        NEWCOLOR={NEWCOLOR}
        size={20}
        isBookmarked={isBookmarked}
        onPress={onPressBoomark}
        style={{paddingHorizontal: 10}}
        />
        {/* 버스번호, 방향 */}
        <View style={{flex: 1}}>
          <Text style={{color: numColor, fontSize: 20}}>{num}</Text>
          <Text style={{fontSize: 13, color:COLOR.GRAY_3, marginRight: 5}}>{directionDescription} 방향</Text>
        </View>
      </View>
      <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
        {/* M분 S초 / N번째 전 / 여유 */}
        <View style={{flex:1}}>
          {processedNextBusInfos.map((info, index) => (
            <NextBusInfo 
              NEWCOLOR={NEWCOLOR}
              key={`next-bus-info-${index}`}
              busInfo={info.hasInfo} 
              remainedTimeText={info.remainedTimeText} 
              numOfRemainedStops={info.numOfRemainedStops} 
              seatStatusText={info.seatStatusText}
            />
           ))}
          {/* <NextBusInfo busInfo={true} remainedTimeText={"8분 0초"} numOfRemainedStops={5} seatStatusText={"여유"}/> */}
          {/* <NextBusInfo busInfo={false} remainedTimeText={"도착 정보 없음"} /> */}
        </View>
        {/* 알람아이콘 */}
        <AlarmButton NEWCOLOR={NEWCOLOR} onPress={() => {}} style={{paddingHorizontal:15}} />
      </View>
    </View>
  )
};