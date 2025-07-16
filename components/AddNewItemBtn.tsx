import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props{
    addToList: () => void,
}

const AddNewItemBtn = ({addToList}: Props) => {
  return (
    <TouchableOpacity 
        style={styles.btn}
        onPress={addToList}
    >
        <AntDesign name="pluscircle" size={18} color="white" />
        <Text style={styles.btnText}>New Item</Text>
    </TouchableOpacity>
  )
}

export default AddNewItemBtn

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
    btnText:{
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 8,
    }

})