import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

const AddNewListBtn = () => {

  const router = useRouter();

  const addToList = () => {
    router.replace("/add/list")
  }

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={addToList}
    >
      <AntDesign name="pluscircle" size={20} color="#0A3A40" />
      <Text style={styles.btnText}>New List</Text>
    </TouchableOpacity>
  )
}

export default AddNewListBtn

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c04621ff",
    paddingHorizontal: 2,
    paddingVertical: 6,
    borderRadius: 4,
    fontWeight: "bold",
    width: "50%",
    borderColor: "#c04621ff",
    borderWidth: 2
  },
  btnText: {
    color: "#0A3A40",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 8,
  },
})