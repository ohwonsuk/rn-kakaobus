import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Switch
} from "react-native";
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import BusInfo from './src/BusInfo';
import { COLOR } from './src/color';
import { busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections } from './src/data';
import Margin from './src/Margin';
import BookmarkButton from './src/BookmarkButton';
import { useTheme } from './src/use-theme';

const busStopBookMarkSize = 20;
const busStopBookMarkPadding = 6;

export default function App() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);

  const {isDark, toggleIsDark, NEWCOLOR } = useTheme();

  const onPressBusStopBoomark = () => {};

  const ListHeaderComponent = () => (
    <View style={{
      backgroundColor: COLOR.GRAY_3, 
      height: 170, 
      justifyContent: 'center', 
      alignItems: 'center'
      }}>
      {/* 정류소 번호, 이름, 방향 */}
        <Margin height={10} />
        <Text style={{color: NEWCOLOR.WHITE_BLACK, fontSize: 13}}>{busStop.id}</Text>
        <Margin height={4} />
        <Text style={{color: NEWCOLOR.WHITE_BLACK, fontSize: 20}}>{busStop.name}</Text>
        <Margin height={4} />
        <Text style={{color: NEWCOLOR.GRAY_1_GRAY_2, fontSize: 14}}>{busStop.directionDescription}</Text>
        <Margin height={15} />

        {/* 북마크 */}
        <BookmarkButton 
          NEWCOLOR={NEWCOLOR}
          size={busStopBookMarkSize}
          isBookmarked={busStop.isBookmarked}
          onPress={onPressBusStopBoomark}
          style={{
            borderWidth: 0.5, 
            borderColor: COLOR.GRAY_1, 
            borderRadius: (busStopBookMarkSize + busStopBookMarkPadding * 2) /2, 
            padding: busStopBookMarkPadding
          }}
        />
        <Margin height={10}/>
        <Switch 
          value={isDark} 
          onValueChange={(v) => {
          console.log('changed switch value',v);
          toggleIsDark();
          }}/>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={{
      paddingLeft: 13, 
      paddingVertical: 3, 
      backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
      borderTopWidth:0.5,
      borderBottomWidth:0.5,
      borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
      borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3
      }}>
      <Text style={{fontSize: 12, color: NEWCOLOR.GRAY_4_GRAY_1}}>{title}</Text>
    </View>
  );
  const renderItem = ({item: bus}) => {
    const numColor = getBusNumColorByType(bus.type);
        /**
     * Start
     */
    // undefined ?? null -> null 
    // { ... } ?? null -> { ... }
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null; 
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    // if (bus.num === 2000) {
    //   console.log(bus.num, 'newNextBusInfos', newNextBusInfos); // TODO: 확인
    // }

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    /**
     * End
     */

    return (
      <BusInfo 
      NEWCOLOR={NEWCOLOR}
      isBookmarked={bus.isBookmarked}
      onPressBoomark={() => {}}
      num={bus.num}
      directionDescription={bus.directionDescription}
      numColor={numColor}
      processedNextBusInfos={processedNextBusInfos}
      />
  )};

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const ItemSeparatorComponent = () => (
    <View style={{width: "100%", height:1, backgroundColor: NEWCOLOR.GRAY_1_GRAY_4}} />
  );

  const ListFooterComponent = () => (
    <Margin height={30} />
  );

  const onRefresh = () => {
    console.log('call onRefresh');
    setRefreshing(true);
  };

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
      setNow(dayjs());
      // setTimeout(() => {
        // API refetch 완료되는 시점
        // setRefreshing(false);
      // }, 3000)
    }
  },[refreshing]);

  return (
    <View style={{...styles.container, backgroundColor: NEWCOLOR.WHITE_BLACK}}>
            {/* 뒤로가기, 홈 아이콘 */}
      <View style={{backgroundColor: NEWCOLOR.GRAY_3_GRAY_2, width: "100%"}}>
        <SafeAreaView style={{flexDirection: 'row', justifyContent: "space-between"}}>
          <TouchableOpacity style={{padding:10 }}>
            <SimpleLineIcons name="arrow-left" size={20} color={NEWCOLOR.WHITE_BLACK} />
          </TouchableOpacity>
          <TouchableOpacity style={{padding:10 }}>
            <SimpleLineIcons name="home" size={20} color={NEWCOLOR.WHITE_BLACK} />
          </TouchableOpacity>
        </SafeAreaView>
        {/* 화면아래로 스크롤시 화이트배경 보이지 않도록 박스만들기 */}
        <View style={{
          position: 'absolute',
          backgroundColor: COLOR.GRAY_3, 
          width: "100%", 
          height: 500,
          zIndex: -1
        }}>
        </View>
      </View>
        <SectionList
          style={{flex:1, width: "100%"}}
          sections={sections}
          renderSectionHeader={renderSectionHeader}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ListFooterComponent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
