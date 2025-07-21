import AddNameModal from '@/components/AddNameModal'
import AddNewListItemBtn from '@/components/AddNewListItemBtn'
import DeleteListItemModal from '@/components/DeleteListItemModal'
import EditNameModal from '@/components/EditNameModal'
import ListItemCard from '@/components/ListItemCard'
import NoSelectedListComponent from '@/components/NoSelectedListComponent'
import useListItemStore from '@/stores/listItemStore'
import useShoppingListStore from '@/stores/shoppingListsStore'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ItemType {
  id: string,
  name: string,
  listId: string,
  completed: boolean
};

const ShoppingListDetails = () => {

  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState<string | undefined>("Default");
  const [displayList, setDisplayList] = useState<ItemType[]>([]);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ItemType | null>(null)
  const [itemTodelete, setItemToDelete] = useState<ItemType | null>(null)

  const getShoppingListById = useShoppingListStore((state) => state.getShoppingListById)

  const getItemsByListId = useListItemStore((state) => state.getItemsByListId)
  const items = useListItemStore((state) => state.items)
  const addNewItem = useListItemStore((state) => state.addNewItem)
  const updateItem = useListItemStore((state) => state.updateItem)
  const removeItem = useListItemStore((state) => state.removeItem)

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
  }, [items])

  const addItem = (newName: string) => {
    let newItem: ItemType = {
      id: Math.random().toString(36).substring(2, 15),
      name: newName,
      listId: id as string,
      completed: false
    }
    addNewItem(newItem)
    setAddModalVisible(false)
  }

  const editItemName = (editedName: string) => {
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
  }

  const deleteItem = (id: string) => {
    removeItem(id)
    setDeleteModalVisible(false)
  }

  // If no id is provided, show a no selected list component
  if (id == null) {
    return (
      <NoSelectedListComponent />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
          <View style={styles.btnContainer}>
            <AddNewListItemBtn
              setModalVisible={setAddModalVisible}
              buttonText='New Item'
            />
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
      />

      {/* Edit Item name modal */}
      <EditNameModal
        modalVisible={editModalVisible}
        editName={editItemName}
        setModalVisible={setEditModalVisible}
        currentNameId={itemToEdit?.id}
        modalType="item"
        modalTitle="Edit Item"
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
  btnContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 2,
    marginBottom: 18
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
  }
})