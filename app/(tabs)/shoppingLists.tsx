import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ListCard from '@/components/ListCard'

import AddNameModal from '@/components/AddNameModal'
import AddNewListItemBtn from '@/components/AddNewListItemBtn'
import EmptyListComponent from '@/components/EmptyListComponent'
import useShoppingListStore from '@/stores/shoppingListsStore'
import { useState } from 'react'

const ShoppingLists = () => {

  const shoppingLists = useShoppingListStore((state) => state.shoppingLists)
  const addNewShoppingList = useShoppingListStore((state) => state.addNewShoppingList)

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const addName = (newName: string) => {
    let newShoppingList = {
      id: Math.random().toString(36).substring(2, 15),
      name: newName
    }
    // add to shopping list
    addNewShoppingList(newShoppingList);
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <FlatList
        data={shoppingLists}
        renderItem={({ item }) => <ListCard title={item.name} id={item.id} />}
        keyExtractor={item => item.id}
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