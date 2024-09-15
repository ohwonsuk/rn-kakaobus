import {
  FlatList,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>FlatList</Text>
        <FlatList
          data={[
            { busNum: 146 },
            { busNum: 360 },
            { busNum: 740 },
            { busNum: 3412 },
            { busNum: 1100 },
            { busNum: 1700 },
          ]}
          renderItem={({ item }) => <Text>{item.busNum}</Text>}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>SectionList</Text>
        <SectionList
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
        />
      </View>
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
