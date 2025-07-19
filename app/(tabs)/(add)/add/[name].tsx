import PickerComponent from '@/components/PickerComponent';
import useShoppingListStore from '@/stores/shoppingListsStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const AddPage = () => {

  const { name } = useLocalSearchParams();

  const addToShoppingList = useShoppingListStore((state) => state.addToShoppingList)

  const [selectedBtn, setSelectedBtn] = useState<string | string[]>("list");
  const [newName, setNewName] = useState("");
  const [formTitle, setFormTitle] = useState("Create New List");
  const [formPlaceHolder, setFormPlaceHolder] = useState("new list");
  const [formBtnText, setFormBtnText] = useState("List");
  const [formType, setFormType] = useState("list")
  const [selectedList, setSelectedList] = useState("" as string);
  
  let listToPickFrom = useShoppingListStore.getState().shoppingLists;

  useEffect(()=>{
    if(name != undefined) setSelectedBtn(name);
  }, [])

  const addToList = (value: string) =>{
    setSelectedBtn(value);

    if(value == "list"){
      setFormTitle("Create New List");
      setFormPlaceHolder("new list");
      setFormBtnText("List");
      setFormType("list");
    } else if(value == "item"){
      setFormTitle("Add New Item");
      setFormPlaceHolder("new item");
      setFormBtnText("Item");
      setFormType("item");
    }
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
      <View style={styles.form}>
        <Text style={styles.label}>{formTitle} </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setNewName(text)}
          value={newName}
          placeholder={formPlaceHolder}
        />
        {
          formType == "item" ? 
          (
            <PickerComponent 
              selected={selectedList} 
              setSelected={setSelectedList} 
              listToPickFrom={listToPickFrom}
            />
          ): null
        }
        <TouchableOpacity style={styles.formBtn}>
          <Ionicons name="add-circle-sharp" size={22} color="#E9DCC9" />
          <Text style={styles.formBtnText}>Add {formBtnText}</Text>
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
    width: "100%",
    marginBottom: 40,
    marginTop: 8
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
      backgroundColor: "#c04621ff",
      color: "#0A3A40",
      borderColor: "#c04621ff",
    },
    btnInActive:{
      backgroundColor: "#943011ff",
      color: "#0A3A40",
      borderColor: "#943011ff",
    },
    btnText: {
      color: "#0A3A40",
      fontSize: 16,
      fontWeight: "bold",
      paddingLeft: 8,
    },
    form:{
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: 15,
      backgroundColor: "#c04621ff",
      borderRadius: 4,
    },
    label:{
      fontSize: 18,
      color: "#0A3A40",
      fontWeight: "bold",
      paddingBottom: 20,
    },
    input:{
      width: "80%",
      height: 55,
      backgroundColor: "#E9DCC9",
      color: "#0A3A40",
      borderRadius: 10,
      fontSize: 18,
      paddingVertical: 4,
      paddingHorizontal: 10,
    },
    formBtn:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 18,
      paddingHorizontal: 2,
      paddingVertical: 8,
      borderRadius: 4,
      fontWeight: "bold",
      width: "50%",
      borderWidth: 2,
      marginHorizontal: 6,
      backgroundColor: "#0A3A40",
      color: "#E9DCC9",
      borderColor: "#0A3A40",
      marginTop: 18,
    },
    formBtnText: {
      color: "#E9DCC9",
      fontSize: 18,
      fontWeight: "bold",
      paddingLeft: 8,
    },
    addMargin:{
      marginTop: 20
    },
})