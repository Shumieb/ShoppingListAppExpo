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
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ItemType {
  id: string,
  name: string,
  listId: string,
  completed: boolean
};

const ShoppingListDetails = () => {

  const { id } = useLocalSearchParams()

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
  const getItemCountByListId = useListItemStore((state) => state.getItemCountByListId)

  const getItemsByListId = useListItemStore((state) => state.getItemsByListId)
  const items = useListItemStore((state) => state.items)
  const addNewItem = useListItemStore((state) => state.addNewItem)
  const updateItem = useListItemStore((state) => state.updateItem)
  const removeItem = useListItemStore((state) => state.removeItem)
  const deleteAllItemsFromList = useListItemStore((state) => state.deleteAllItemsFromList)

  useEffect(() => {
    if (id != null) {
      // set the page title
      let newTitle = getShoppingListById(id);
      if (newTitle?.name) {
        setTitle(newTitle?.name);
      }

      // set the list to display
      let list: ItemType[] = getItemsByListId(id);
      setDisplayList(list);
    }
  }, [id])

  useEffect(() => {
    // set the list to display
    let list: ItemType[] = getItemsByListId(id);
    setDisplayList(list);

    // set the item count
    let count = getItemCountByListId(id);
    if (count != null) setItemCount(count);
  }, [items])

  const addItem = (newName: string) => {
    if (newName.trim().length <= 0) {
      setInputErrorMsg("Please enter an item name")
      setInputError(true)
      return
    }

    let newItem: ItemType = {
      id: Math.random().toString(36).substring(2, 15),
      name: newName,
      listId: id as string,
      completed: false
    }

    addNewItem(newItem)
    setAddModalVisible(false)
    removeErrorMsg()
  }

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
      updateItem(updatedItem)
      setEditModalVisible(false)
    }
    removeErrorMsg()
  }

  const deleteItem = (id: string) => {
    removeItem(id)
    setDeleteModalVisible(false)
  }

  const clearList = (id: string) => {
    deleteAllItemsFromList(id);
    setClearListModalVisible(false)
  }

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
          />
        }
        keyExtractor={item => item.id}
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
        currentNameId={itemToEdit?.id}
        modalType="item"
        modalTitle="Edit Item"
        inputError={inputError}
        inputErrorMsg={inputErrorMsg}
        removeErrorMsg={removeErrorMsg}
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
        listToDeleteId={id as string}
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