import { Link } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [userName, setUserName] = useState("");

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar style="light"/>
      <Text style={[styles.title, styles.titleMedium]}>Welcome to the</Text>
      <Text style={[styles.title, styles.titleLarge]}>Shopping List</Text>
      <Text style={[styles.title, styles.titleLarge]}>App</Text>
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
    fontWeight: "bold"
  },
  titleMedium: {
    fontSize: 18,
  },
  titleLarge:{
    fontSize: 22,
  },
  link: {
    fontSize: 18,
    backgroundColor: "#f4511e",
    color: "#fff",
    paddingHorizontal: 2,
    paddingVertical: 8,
    marginTop: 20,
    borderRadius: 4,
    fontWeight: "bold",
    width: "60%",
    textAlign: "center"
  }
})
