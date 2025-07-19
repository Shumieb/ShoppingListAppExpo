import { StyleSheet, TextInput } from 'react-native';

interface formTextInputProps {
  onChangeHandler: (text: string) => void;  
    inputValue: string;
    formPlaceHolder: string;    
}

const FormTextInput = ({onChangeHandler, inputValue, formPlaceHolder}: formTextInputProps) => {
  return (
     <TextInput
        style={styles.input}
        onChangeText={text => onChangeHandler(text)}
        value={inputValue}
        placeholder={formPlaceHolder}
    />
  )
}

export default FormTextInput

const styles = StyleSheet.create({
    input:{
    width: "80%",
    height: 55,
    backgroundColor: "#E9DCC9",
    color: "#0A3A40",
    borderRadius: 10,
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
})