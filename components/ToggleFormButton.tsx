import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface toggleFormButtonProps {
    selectedBtn: string;
    addToList: (value: string) => void;
    buttonValue: string;
    buttonText: string;
}

const ToggleFormButton = (
    {selectedBtn, addToList, buttonValue, buttonText}:toggleFormButtonProps
) => {
  return (
    <TouchableOpacity 
        style={[styles.btn, (selectedBtn == buttonValue) ? styles.btnActive : styles.btnInActive]}
        onPress={() => addToList(buttonValue)}
    >
        <Text style={styles.btnText}> {buttonText} </Text>
    </TouchableOpacity>
  )
}

export default ToggleFormButton

const styles = StyleSheet.create({
    btn:{
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
    btnActive:{
      backgroundColor: "#c04621ff",
      color: "#0A3A40",
      borderColor: "#c04621ff",
    },
    btnInActive:{
      backgroundColor: "#943011ff",
      color: "#0A3A40",
      borderColor: "#943011ff",
    },
    btnText: {
      color: "#0A3A40",
      fontSize: 18,
      fontWeight: "bold",
      paddingLeft: 8,
    },
})