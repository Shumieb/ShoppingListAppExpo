import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

const AddNewListBtn = () => {   

  const router = useRouter();

  const addToList = () =>{
    router.replace("/add/list")
  }

  return (
    <TouchableOpacity 
        style={styles.btn}
        onPress={addToList}
    >
        <AntDesign name="pluscircle" size={18} color="white" />
        <Text style={styles.btnText}>New List</Text>
    </TouchableOpacity>
  )
}

export default AddNewListBtn

const styles = StyleSheet.create({
    btn:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 18,
      backgroundColor: "#f4511e",
      color: "#fff",
      paddingHorizontal: 2,
      paddingVertical: 6,
      borderRadius: 4,
      fontWeight: "bold",
      width: "40%",
      borderColor: "#f4511e",
      borderWidth: 2
    },
    btnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      paddingLeft: 8,
    },
})