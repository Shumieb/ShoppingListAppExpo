import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ListCard from '@/components/ListCard'

import AddNameModal from '@/components/AddNameModal'
import AddNewListItemBtn from '@/components/AddNewListItemBtn'
import EmptyListComponent from '@/components/EmptyListComponent'
import useShoppingListStore from '@/stores/shoppingListsStore'
import { ListType } from '@/util/entityTypes'
import { useSQLiteContext } from 'expo-sqlite'
import { useEffect, useState } from 'react'

const ShoppingLists = () => {

  const [listsToDisplay, setListsToDisplay] = useState<ListType[]>([])

  const shoppingLists = useShoppingListStore((state) => state.shoppingLists)
  const addNewShoppingList = useShoppingListStore((state) => state.addNewShoppingList)
  const initializeShoppingLists = useShoppingListStore((state) => state.initializeShoppingLists);
  const getAllShoppingLists = useShoppingListStore((state) => state.getAllShoppingLists);

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [inputError, setInputError] = useState<boolean>(false)
  const [inputErrorMsg, setInputErrorMsg] = useState<string>("")

  const myDb = useSQLiteContext();

  // on first load, initialize the shopping lists from the database
  useEffect(() => {
    if (shoppingLists.length > 0) return;
    async function setup() {
      initializeShoppingLists(myDb || undefined);
    }
    setup();

  }, []);

  // whenever the shopping lists change, update the lists to display
  useEffect(() => {
    function fetchShoppingLists() {
      let list = getAllShoppingLists();
      if (!list || list.length === 0) return;
      setListsToDisplay(list);
    }
    fetchShoppingLists();
  }, [shoppingLists]);

  // function to add a new shopping list
  const addName = async (newName: string) => {
    if (newName.trim().length <= 0) {
      setInputErrorMsg("Please enter an Shopping List name")
      setInputError(true)
      return
    }

    // add to shopping list
    await addNewShoppingList(myDb, newName);
    setModalVisible(false)

    if (inputError) {
      setInputErrorMsg("")
      setInputError(false)
    }
  }

  // function to remove error message
  const removeErrorMsg = () => {
    if (inputError) {
      setInputErrorMsg("")
      setInputError(false)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <FlatList
        data={listsToDisplay}
        renderItem={({ item }) => (<ListCard item={item} />)}
        keyExtractor={item => item.id.toString()}
        style={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.btnContainer}>
            <AddNewListItemBtn
              setModalVisible={setModalVisible}
              buttonText='New List'
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <EmptyListComponent
              ListType="Shopping List"
              buttonText="New List"
            />
          </View>
        }
      />

      {/* Add New List Modal */}
      <AddNameModal
        modalVisible={modalVisible}
        addName={addName}
        setModalVisible={setModalVisible}
        modalTitle="Add New Shopping List"
        placeHolder='new shopping list'
        inputError={inputError}
        inputErrorMsg={inputErrorMsg}
        removeErrorMsg={removeErrorMsg}
      />
    </SafeAreaView>
  )
}

export default ShoppingLists

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 6,
    backgroundColor: "#0A3A40",
  },
  listContainer: {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 6,
  },
  btnContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 2,
    marginBottom: 18
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#428188ff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  }
})