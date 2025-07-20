import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import AddNewListBtn from '@/components/AddNewListBtn'
import ListCard from '@/components/ListCard'

import useShoppingListStore from '@/stores/shoppingListsStore'

const ShoppingLists = () => {

  const shoppingLists = useShoppingListStore((state) => state.shoppingLists)

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <FlatList
        data={shoppingLists}
        renderItem={({ item }) => <ListCard title={item.name} id={item.id} />}
        keyExtractor={item => item.id}
        style={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.btnContainer}>
            <AddNewListBtn />
          </View>
        }
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
})