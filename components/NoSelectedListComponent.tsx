import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NoSelectedListComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text}> Click the button below to</Text>
            <Text style={styles.text}> Select and View </Text>
            <Text style={styles.text}> Shopping Lists</Text>
        </View>
        <Link href="/shoppingLists" style={styles.link}>
            <Text style={styles.linkText}>View Lists</Text>
        </Link>
    </SafeAreaView>
  )
}

export default NoSelectedListComponent

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 6,
        margin: 0,
        paddingTop: 5,
        backgroundColor: "#0A3A40",
    },
    textContainer:{
        padding: 2,
        marginBottom: 10,
    },
    text:{
        fontSize: 18,
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "bold"
    },
    link:{
      fontSize: 18,
      paddingHorizontal: 2,
      paddingVertical: 6,
      borderRadius: 4,
      fontWeight: "bold",
      width: "40%",
      borderWidth: 2,
      marginHorizontal: 6,
      backgroundColor: "#f4511e",
      color: "#fff",
      borderColor: "#f4511e",
      textAlign: "center"
    },
    linkText:{
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 8,
    }
})