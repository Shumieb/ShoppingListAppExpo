import AddNewListBtn from '@/components/AddNewListBtn';
import ListCard from '@/components/ListCard';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShoppingLists = () => {
  const [shoppingLists, setShoppingLists] = useState([
    { id:"1", name: "Shopping List 1"},
    { id:"2", name: "Shopping List 2"},
    { id:"3", name: "Shopping List 3"},
    { id:"4", name: "Shopping List 4"}
  ])

  const addToList = () =>{
        console.log("add to list")
  }
    
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>          
      <FlatList
        data={shoppingLists}
        renderItem={({item})=> <ListCard title={item.name} id={item.id}/>}
        keyExtractor={item => item.id}
        style={styles.listContainer}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.btnContainer}>
            <AddNewListBtn addToList={addToList}/>
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
        paddingRight: 6,
        margin: 0,
        backgroundColor: "#0A3A40",
    },
    listContainer:{
      flex: 1,
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 2,
      paddingHorizontal: 2
    },
    btnContainer:{
      width: "100%",
      alignItems: "flex-start",
      paddingHorizontal: 12,
      marginBottom: 18
    },   
})