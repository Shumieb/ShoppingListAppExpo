import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface formSubmitButtonProps {
  formBtnText: string;
}

const FormSubmitButton = ({formBtnText}: formSubmitButtonProps) => {
  return (
    <TouchableOpacity style={styles.formBtn}>
        <Ionicons name="add-circle-sharp" size={22} color="#E9DCC9" />
        <Text style={styles.formBtnText}>Add {formBtnText}</Text>
    </TouchableOpacity>
  )
}

export default FormSubmitButton

const styles = StyleSheet.create({
    formBtn:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 18,
      paddingHorizontal: 2,
      paddingVertical: 8,
      borderRadius: 4,
      fontWeight: "bold",
      width: "50%",
      borderWidth: 2,
      marginHorizontal: 6,
      backgroundColor: "#0A3A40",
      color: "#E9DCC9",
      borderColor: "#0A3A40",
      marginTop: 18,
    },
    formBtnText: {
      color: "#E9DCC9",
      fontSize: 18,
      fontWeight: "bold",
      paddingLeft: 8,
    },
});