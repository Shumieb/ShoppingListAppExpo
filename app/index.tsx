import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar style="light"/>
      <FontAwesome5 name="clipboard-list" size={28} color="white" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Shopping List</Text>
        <Text style={styles.title}>App</Text>
      </View>
      <Link href="/shoppingLists" style={styles.link}>Shopping Lists</Link>       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A3A40"
  },
  title:{
    padding: 2,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center"
  },
  link: {
    fontSize: 18,
    backgroundColor: "#f4511e",
    color: "#fff",
    paddingHorizontal: 2,
    paddingVertical: 8,
    marginTop: 25,
    borderRadius: 4,
    fontWeight: "bold",
    width: "60%",
    textAlign: "center"
  },
  textContainer: {
    padding: 4,
    textAlign: "center",
    marginTop: 15
  }
})
