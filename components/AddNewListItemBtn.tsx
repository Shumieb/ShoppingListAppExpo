import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface PropTypes {
  setModalVisible: (visible: boolean) => void;
  buttonText: string
}

const AddNewListItemBtn = ({
  setModalVisible,
  buttonText
}: PropTypes) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => setModalVisible(true)}
    >
      <AntDesign name="pluscircle" size={20} color="#0A3A40" />
      <Text style={styles.btnText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default AddNewListItemBtn

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