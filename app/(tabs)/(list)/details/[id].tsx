import AddNewItemBtn from '@/components/AddNewItemBtn'
import ListItemCard from '@/components/ListItemCard'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import NoSelectedListComponent from '@/components/NoSelectedListComponent'
import useListItemStore from '@/stores/listItemStore'
import useShoppingListStore from '@/stores/shoppingListsStore'

interface listType{
  id: string,
  name: string,
  listId: string,
  completed: boolean
};

const ShoppingListDetails = () => {

  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState<string | undefined>("Default");
  const [displayList, setDisplayList] = useState<listType[]>([]);

  const shoppingLists = useShoppingListStore((state) => state.shoppingLists)

  const listItems = useListItemStore((state) => state.items)

  useEffect(() =>{    
    if(id != null){
      // set the page title
      let newTitle = shoppingLists.find((list: listType) => list.id === id);
      if(newTitle?.name){
        setTitle(newTitle?.name);
      }  

      // set the list to display
      let list: listType[] = listItems.filter((item: listType) => item.listId === id);
      setDisplayList(list);
    }   
  }, [])

  const addItemToList = () => {
        console.log("add item to list")
  }

  const toggleItemCompleted = (id:string) =>{
    console.log("toggle completed", id)
  }

  if(id == null){
    return(
      <NoSelectedListComponent/>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={displayList}
        renderItem={({item})=> 
          <ListItemCard 
            title={item.name} 
            id={item.id} 
            completed={item.completed}
            toggleItemCompleted={toggleItemCompleted}
          />
        }
        keyExtractor={item => item.id}
        style={styles.listContainer}
        ListHeaderComponent={
            <View style={styles.btnContainer}>
              <AddNewItemBtn />
            </View>
          }
      />
    </SafeAreaView>
  )
}

export default ShoppingListDetails

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 6,
    margin: 0,
    paddingTop: 5,
    backgroundColor: "#0A3A40",
  },
  listContainer:{
      flex: 1,
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 2,
      paddingHorizontal: 2,
      marginTop: 20
    },
  title:{
    color: "#fff",
    paddingTop: 18,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold"
  }, 
  btnContainer:{
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 2,
    marginBottom: 18
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