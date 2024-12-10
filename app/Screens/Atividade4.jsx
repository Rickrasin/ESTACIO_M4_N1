import React from "react";

import { SectionList, FlatList, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    margin: "auto",
    gap: 16,
    paddingTop: 64,
    padding: 16
  },

  sectionHeader: {
    paddingTop: 2,

    paddingLeft: 10,

    paddingRight: 10,

    paddingBottom: 2,

    fontSize: 14,

    fontWeight: "bold",

    backgroundColor: "rgba(247,247,247,1.0)"
  },

  item: {
    padding: 10,

    fontSize: 18,

    height: 44
  }
});

const SectionListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        style={{
          width: "100%",
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 1
        }}
        data={[
          { key: "Devin" },

          { key: "Dan" },

          { key: "Dominic" },

          { key: "Jackson" },

          { key: "James" },

          { key: "Joel" },

          { key: "John" },

          { key: "Jillian" },

          { key: "Jimmy" },

          { key: "Julie" }
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
      <SectionList
        style={{
          width: "100%",
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 1
        }}
        sections={[
          { title: "D", data: ["Devin", "Dan", "Dominic"] },

          {
            title: "J",

            data: [
              "Jackson",

              "James",

              "Jillian",

              "Jimmy",

              "Joel",

              "John",

              "Julie"
            ]
          }
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item) => `basicListEntry-${item}`}
      />
    </View>
  );
};

export default SectionListBasics;
