import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HomePage = () => {
    
  return (
    <View style={styles.container}>
      <Text>HomePage</Text>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 4,
        paddingVertical: 6,
    },
   
})