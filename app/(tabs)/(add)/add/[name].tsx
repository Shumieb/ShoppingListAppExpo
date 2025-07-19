import FormSubmitButton from '@/components/FormSubmitButton';
import PickerComponent from '@/components/PickerComponent';
import ToggleFormButton from '@/components/ToggleFormButton';
import useShoppingListStore from '@/stores/shoppingListsStore';

import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddPage = () => {

  const { name } = useLocalSearchParams();

  const addToShoppingList = useShoppingListStore((state) => state.addToShoppingList)

  const [selectedBtn, setSelectedBtn] = useState<string>("list");
  const [newName, setNewName] = useState("");
  const [formTitle, setFormTitle] = useState("Create New List");
  const [formPlaceHolder, setFormPlaceHolder] = useState("new list");
  const [formBtnText, setFormBtnText] = useState("List");
  const [formType, setFormType] = useState("list")
  const [selectedList, setSelectedList] = useState("" as string);
  
  let listToPickFrom = useShoppingListStore.getState().shoppingLists;

  useEffect(()=>{
    if(name != undefined && (typeof name === "string")) setSelectedBtn(name);
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
    <SafeAreaView style={styles.container}> 
      <View style={styles.btnContainer}>
        <ToggleFormButton 
          selectedBtn={selectedBtn}
          addToList={addToList}
          buttonValue="list" 
          buttonText="New List"
        />
        <ToggleFormButton 
          selectedBtn={selectedBtn}
          addToList={addToList}
          buttonValue="item" 
          buttonText="New Item"
        />
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
        <FormSubmitButton formBtnText={formBtnText} />
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
    backgroundColor: "#0A3A40",
  },
  btnContainer:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 40,
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
      fontSize: 22,
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
    addMargin:{
      marginTop: 20
    },
})