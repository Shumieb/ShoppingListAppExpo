import { StyleSheet, TextInput } from 'react-native';

interface formTextInputProps {
  onChangeHandler: (text: string) => void;
  inputValue: string;
  formPlaceHolder: string;
  bgColor?: string;
  textColor?: string;
  placeholderTextColor?: string;
}

const FormTextInput = ({
  onChangeHandler,
  inputValue,
  formPlaceHolder,
  bgColor = "#E9DCC9",
  textColor = "#0A3A40",
  placeholderTextColor = "#848787ff",
}: formTextInputProps
) => {
  return (
    <TextInput
      style={[styles.input, { backgroundColor: bgColor, color: textColor }]}
      onChangeText={text => onChangeHandler(text)}
      value={inputValue}
      placeholder={formPlaceHolder}
      placeholderTextColor={placeholderTextColor}
    />
  )
}

export default FormTextInput

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 55,
    borderRadius: 10,
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
})