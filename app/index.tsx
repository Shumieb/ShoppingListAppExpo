import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>Shopping List</Text>
      <Text style={styles.title}>App</Text>
      <Link href="/homePage" style={styles.link}>Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize: 22,
    padding: 2,
    color: "#f4511e",
    fontWeight: "bold"
  },
  link: {
    fontSize: 18,
    backgroundColor: "#f4511e",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 15,
    borderRadius: 4,
    fontWeight: "bold",
    width: "50%",
    textAlign: "center"
  }
})
