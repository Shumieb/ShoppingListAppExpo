import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface PropTypes {
  selectedForm: string;
  toggleForm: (value: string) => void;
  buttonValue: string;
  buttonText: string;
}

const ToggleFormButton = (
  { selectedForm, toggleForm, buttonValue, buttonText }: PropTypes
) => {
  return (
    <TouchableOpacity
      style={[styles.btn, (selectedForm == buttonValue) ? styles.btnActive : styles.btnInActive]}
      onPress={() => toggleForm(buttonValue)}
    >
      <Text style={(selectedForm == buttonValue) ? styles.btnText : styles.btnTextInActive}> {buttonText} </Text>
    </TouchableOpacity>
  )
}

export default ToggleFormButton

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
    paddingVertical: 6,
    borderRadius: 4,
    fontWeight: "bold",
    width: "40%",
    borderWidth: 2,
    marginHorizontal: 6,
  },
  btnActive: {
    backgroundColor: "#428188ff",
    color: "#E9DCC9",
    borderColor: "#428188ff",
  },
  btnInActive: {
    backgroundColor: "#603529ff",
    color: "#0A3A40",
    borderColor: "#603529ff",
  },
  btnText: {
    color: "#E9DCC9",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 8,
  },
  btnTextInActive: {
    color: "#a79d90ff",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 8,
  },
})