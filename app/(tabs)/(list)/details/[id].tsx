import AddNameModal from '@/components/AddNameModal'
import AddNewListItemBtn from '@/components/AddNewListItemBtn'
import ClearListBtn from '@/components/ClearListBtn'
import ClearListModal from '@/components/ClearListModal'
import DeleteListItemModal from '@/components/DeleteListItemModal'
import EditNameModal from '@/components/EditNameModal'
import EmptyListComponent from '@/components/EmptyListComponent'
import ListItemCard from '@/components/ListItemCard'
import NoSelectedListComponent from '@/components/NoSelectedListComponent'
import useListItemStore from '@/stores/listItemStore'
import useShoppingListStore from '@/stores/shoppingListsStore'
import { ItemType } from '@/util/entityTypes'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, useLocalSearchParams } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ShoppingListDetails = () => {

  const { id } = useLocalSearchParams()

  const myDb = useSQLiteContext();

  const [title, setTitle] = useState<string | undefined>("Default")
  const [displayList, setDisplayList] = useState<ItemType[]>([])
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [clearListModalVisible, setClearListModalVisible] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<ItemType | null>(null)
  const [itemTodelete, setItemToDelete] = useState<ItemType | null>(null)
  const [itemCount, setItemCount] = useState<number>(0)
  const [inputError, setInputError] = useState<boolean>(false)
  const [inputErrorMsg, setInputErrorMsg] = useState<string>("")

  const getShoppingListById = useShoppingListStore((state) => state.getShoppingListById)

  const getItemsByShoppingListId = useListItemStore((state) => state.getItemsByShoppingListId)
  const addNewItem = useListItemStore((state) => state.addNewItem)
  const updateListItem = useListItemStore((state) => state.updateListItem)
  const removeListItem = useListItemStore((state) => state.removeListItem)
  const deleteAllItemsFromList = useListItemStore((state) => state.deleteAllItemsFromList)

  useEffect(() => {
    async function fetchItems() {
      if (id != null) {
        // set the page title
        let newTitle = await getShoppingListById(Number(id));
        if (newTitle?.name) {
          setTitle(newTitle?.name);
        }
        // set the list to display
        let list: ItemType[] = await getItemsByShoppingListId(myDb, Number(id));
        if (list) {
          setDisplayList(list);
          setItemCount(list.length);
        } else {
          setDisplayList([]);
          setItemCount(0);
        }
      }
    }

    fetchItems();

  }, [id])

  // function to add a new item
  const addItem = (newName: string) => {
    if (newName.trim().length <= 0) {
      setInputErrorMsg("Please enter an item name")
      setInputError(true)
      return
    }

    let newItem: ItemType = {
      id: Math.random(),
      name: newName,
      listId: Number(id as string),
      completed: false
    }
    // add the new item to the database
    addNewItem(myDb, newItem)
    // update the local state
    setDisplayList([...displayList, newItem])
    setItemCount(prev => prev + 1)
    // close modal
    setAddModalVisible(false)
    //reset error state
    removeErrorMsg()
  }
  // function to edit an item name
  const editItemName = (editedName: string) => {
    if (editedName.trim().length <= 0) {
      setInputErrorMsg("Please enter an item name")
      setInputError(true)
      return
    }

    if (itemToEdit) {
      let updatedItem: ItemType = {
        id: itemToEdit.id,
        name: editedName,
        listId: itemToEdit.listId,
        completed: itemToEdit.completed
      }
      // update the item in the database
      updateListItem(myDb, updatedItem)
      // update the local state
      setDisplayList(displayList.map(item => item.id === itemToEdit.id ? updatedItem : item))
      setItemToEdit(null)
      // close modal
      setEditModalVisible(false)
    }
    removeErrorMsg()
  }
  // function to delete an item
  const deleteItem = (id: number) => {
    // delete the item from the database
    removeListItem(myDb, id)
    // update the local state
    setDisplayList(displayList.filter(item => item.id !== id))
    setItemCount(prev => prev - 1)
    setItemToDelete(null)
    // close modal
    setDeleteModalVisible(false)
  }
  // function to clear all items from the list
  const clearList = (id: number) => {
    // delete all items from the database
    deleteAllItemsFromList(myDb, id);
    // update the local state
    setDisplayList([])
    setItemCount(0)
    // close modal
    setClearListModalVisible(false)
  }
  // function to remove error message
  const removeErrorMsg = () => {
    if (inputError) {
      setInputErrorMsg("")
      setInputError(false)
    }
  }

  const showShoppingListSettings = () => {
    if (id != null) {
      const validId = Array.isArray(id) ? id[0] : id;
      router.replace({ pathname: "/listDetails/[id]", params: { id: validId } });
    }
  }

  // If no id is provided, show a no selected list component
  if (id == null) {
    return (
      <NoSelectedListComponent />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={showShoppingListSettings}
          style={styles.settingsBtn}
        >
          <Ionicons name="settings" size={21} color="#E9DCC9" />
        </TouchableOpacity>
      </View>

      {/* list Items */}
      <FlatList
        data={displayList}
        renderItem={({ item }) =>
          <ListItemCard
            item={item}
            setEditModalVisible={setEditModalVisible}
            setDeleteModalVisible={setDeleteModalVisible}
            setItemToEdit={setItemToEdit}
            setItemToDelete={setItemToDelete}
            db={myDb}
          />
        }
        keyExtractor={item => (item.id).toString()}
        style={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <AddNewListItemBtn
              setModalVisible={setAddModalVisible}
              buttonText='New Item'
            />
            {

              itemCount <= 0 &&
              (

                <View style={styles.centerContainer}>
                  <EmptyListComponent
                    ListType={`Items in ${title}`}
                    buttonText="New Item"
                  />
                </View>
              )
            }
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerContainer}>
            {
              itemCount !== 0 &&
              (
                <ClearListBtn
                  setModalVisible={setClearListModalVisible}
                />
              )
            }
          </View>
        }
      />

      {/* Add new Item name modal */}
      <AddNameModal
        modalVisible={addModalVisible}
        addName={addItem}
        setModalVisible={setAddModalVisible}
        modalTitle="Add New Item"
        placeHolder='add new item'
        inputError={inputError}
        inputErrorMsg={inputErrorMsg}
        removeErrorMsg={removeErrorMsg}
      />

      {/* Edit Item name modal */}
      <EditNameModal
        modalVisible={editModalVisible}
        editName={editItemName}
        setModalVisible={setEditModalVisible}
        modalTitle="Edit Item"
        inputError={inputError}
        inputErrorMsg={inputErrorMsg}
        removeErrorMsg={removeErrorMsg}
        title={itemToEdit?.name || ""}
      />

      {/* Delete Item modal */}
      <DeleteListItemModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        modalTitle="Delete Item"
        deleteListItem={deleteItem}
        itemTodelete={itemTodelete}
        modelType="item"
      />

      <ClearListModal
        modalVisible={clearListModalVisible}
        setModalVisible={setClearListModalVisible}
        modalTitle="Clear Shopping List"
        clearList={clearList}
        listToDeleteId={Number(id as string)}
        listName={title}
      />
    </SafeAreaView>
  )
}

export default ShoppingListDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 6,
    margin: 0,
    paddingTop: 5,
    backgroundColor: "#0A3A40",
  },
  titleContainer: {
    paddingBottom: 8,
    position: "relative",
    width: "100%"
  },
  listContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 2,
    paddingHorizontal: 2,
    marginTop: 20
  },
  title: {
    color: "#E9DCC9",
    paddingTop: 18,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  headerContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 2,
    marginBottom: 18
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 2,
    marginTop: 18
  },
  btn: {
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
    backgroundColor: "#f4511e",
    color: "#fff",
    borderColor: "#f4511e",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 8,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
    backgroundColor: "#428188ff",
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20
  },
  settingsBtn: {
    padding: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    right: 3,
    bottom: 1,
  }
})