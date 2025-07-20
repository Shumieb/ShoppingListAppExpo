import FormSubmitButton from '@/components/FormSubmitButton';
import FormTextInput from '@/components/FormTextInput';
import PickerComponent from '@/components/PickerComponent';
import ToggleFormButton from '@/components/ToggleFormButton';
import useListItemStore from '@/stores/listItemStore';
import useShoppingListStore from '@/stores/shoppingListsStore';

import SuccessModal from '@/components/SuccessModal';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface listType {
  id: string;
  name: string;
}

const AddPage = () => {

  const { name } = useLocalSearchParams()

  let listToPickFrom = useShoppingListStore.getState().shoppingLists
  const addNewShoppingList = useShoppingListStore((state) => state.addNewShoppingList)
  const addNewItem = useListItemStore((state) => state.addNewItem)
  const getShoppingListById = useShoppingListStore((state) => state.getShoppingListById)


  const [selectedForm, setSelectedForm] = useState<string>("list");
  const [newName, setNewName] = useState("");
  const [formTitle, setFormTitle] = useState("Create New List");
  const [formPlaceHolder, setFormPlaceHolder] = useState("new list");
  const [formBtnText, setFormBtnText] = useState("List");
  const [formType, setFormType] = useState("list")
  const [selectedList, setSelectedList] = useState("" as string);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    if (name != undefined && (typeof name === "string")) setSelectedForm(name);
  }, [])

  const toggleForm = (value: string) => {
    setSelectedForm(value);
    if (value == "list") {
      setFormTitle("Create New List");
      setFormPlaceHolder("new list");
      setFormBtnText("List");
      setFormType("list");
    } else if (value == "item") {
      setFormTitle("Add New Item");
      setFormPlaceHolder("new item");
      setFormBtnText("Item");
      setFormType("item");
    }
  }

  const addToList = () => {

    if (newName.trim() === "") return;

    if (formType === "list") {
      let newShoppingList = {
        id: Math.random().toString(36).substring(2, 15),
        name: newName
      }
      // add to shopping list
      addNewShoppingList(newShoppingList);
      //set modal text
      setModalText(`You have successfully created: ${newName}`);
      // show modal
      setModalVisible(!modalVisible)
      // reset input
      setNewName("");
    } else if (formType === "item") {

      if (selectedList === "") return;

      let newItem = {
        id: Math.random().toString(36).substring(2, 15),
        name: newName,
        listId: selectedList
      }
      // add to new item
      addNewItem(newItem);
      // set modal text
      setModalText(`You have successfully added ${newName} to ${getShoppingListName()}`)
      // show modal
      setModalVisible(!modalVisible)
      // reset input
      setNewName("");
    }
  }

  const getShoppingListName = () => {
    let shoppingList = getShoppingListById(selectedList) as listType | null;
    if (shoppingList) {
      return shoppingList.name;
    } else {
      return "the list"
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardDismissMode='on-drag'
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="never"
      >
        <View style={styles.btnContainer}>
          <ToggleFormButton
            selectedForm={selectedForm}
            toggleForm={toggleForm}
            buttonValue="list"
            buttonText="New List"
          />
          <ToggleFormButton
            selectedForm={selectedForm}
            toggleForm={toggleForm}
            buttonValue="item"
            buttonText="New Item"
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>{formTitle} </Text>
          <FormTextInput
            onChangeHandler={setNewName}
            inputValue={newName}
            formPlaceHolder={formPlaceHolder}
          />
          {
            formType == "item" ?
              (
                <PickerComponent
                  selected={selectedList}
                  setSelected={setSelectedList}
                  listToPickFrom={listToPickFrom}
                />
              ) : null
          }
          <FormSubmitButton
            formBtnText={formBtnText}
            handleSubmit={addToList}
          />
        </View>
      </ScrollView>

      {/* modal */}
      <SuccessModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalText={modalText}
      />
    </SafeAreaView>
  )
}

export default AddPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 8,
    paddingTop: 20,
    backgroundColor: "#0A3A40",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 40,
  },
  form: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: "#428188ff",
    borderRadius: 4,
  },
  label: {
    fontSize: 22,
    color: "#E9DCC9",
    fontWeight: "bold",
    paddingBottom: 20,
  },
})