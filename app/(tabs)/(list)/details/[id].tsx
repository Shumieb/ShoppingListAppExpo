import AddNewItemBtn from '@/components/AddNewItemBtn';
import ListItemCard from '@/components/ListItemCard';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const [shoppingLists, setShoppingLists] = useState([
    { id:"1", name: "Shopping List 1"},
    { id:"2", name: "Shopping List 2"},
    { id:"3", name: "Shopping List 3"},
    { id:"4", name: "Shopping List 4"}
  ])

  const [listItems, setListItems] = useState<listType[]>([
    {id: "1", name: "List item 1", listId: "1", completed: false},
    {id: "2", name: "List item 2", listId: "2", completed: false},
    {id: "3", name: "List item 3", listId: "1", completed: true},
    {id: "4", name: "List item 4", listId: "3", completed: false},
    {id: "5", name: "List item 5", listId: "4", completed: false},
    {id: "6", name: "List item 6", listId: "1", completed: false},
  ])

  useEffect(() =>{
    // set the page title
    let newTitle = shoppingLists.find((list) => list.id === id);
    if(newTitle?.name){
      setTitle(newTitle?.name);
    }  

    // set the list to display
    let list = listItems.filter((item) => item.listId === id);
    setDisplayList(list);
  }, [id])

  const addItemToList = () => {
        console.log("add item to list")
  }

  const toggleItemCompleted = (id:string) =>{
    let updatedList = listItems.map(item => {
      if(item.id == id){
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setListItems(updatedList);
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
              <AddNewItemBtn addToList={addItemToList}/>
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
  }
})