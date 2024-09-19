import {
  SafeAreaView,
  SectionList,
  StyleSheet,
} from "react-native";
import BusInfo from './src/BusInfo';
import { COLOR } from './src/color';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <BusInfo 
      isBookmarked={true}
      onPressBoomark={() => {}}
      num={146}
      directionDescription="강남역.강남역사거리"
      numColor={COLOR.BUS_B}
      />
        {/* <SectionList
          sections={[
            {
              title: "간선버스",
              data: [{ busNum: 146 }, { busNum: 360 }, { busNum: 740 }],
            },
            {
              title: "지선버스",
              data: [{ busNum: 3412 }],
            },
            {
              title: "직행버스",
              data: [{ busNum: 1100 }, { busNum: 1700 }],
            },
          ]}
          renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
          renderItem={({ item }) => <Text>{item.busNum}</Text>}
        /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
