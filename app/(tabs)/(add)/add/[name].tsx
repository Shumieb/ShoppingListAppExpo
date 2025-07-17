import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useShoppingListStore from '@/stores/shoppingListsStore';

const AddPage = () => {

  const { name } = useLocalSearchParams();

  const addToShoppingList = useShoppingListStore((state) => state.addToShoppingList)

  const [selectedBtn, setSelectedBtn] = useState<string | string[]>("list");

  useEffect(()=>{
    setSelectedBtn(name);
  }, [])

  const addToList = (value: string) =>{
    setSelectedBtn(value);
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}> 
      <View style={styles.btnContainer}>
        <TouchableOpacity 
          style={[styles.btn, (selectedBtn == "list") ? styles.btnActive : styles.btnInActive]}
          onPress={() => addToList("list")}
        >
          <Text style={styles.btnText}>New List </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, (selectedBtn == "item") ? styles.btnActive : styles.btnInActive]}
          onPress={() => addToList("item")}
        >
          <Text style={styles.btnText}>New Item</Text>
        </TouchableOpacity>
      </View>      
    </SafeAreaView>
  )
}

export default AddPage

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingRight: 6,
    paddingHorizontal: 8,
    margin: 0,
    backgroundColor: "#0A3A40",
  },
  btnContainer:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  btn:{
      justifyContent: "center",
      alignItems: "center",
      fontSize: 18,
      paddingHorizontal: 2,
      paddingVertical: 6,
      borderRadius: 4,
      fontWeight: "bold",
      width: "40%",
      borderWidth: 2,
      marginHorizontal: 6,
    },
    btnActive:{
      backgroundColor: "#f4511e",
      color: "#fff",
      borderColor: "#f4511e",
    },
    btnInActive:{
      backgroundColor: "#943011ff",
      color: "#5d656bff",
      borderColor: "#943011ff",
    },
    btnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      paddingLeft: 8,
    },
})