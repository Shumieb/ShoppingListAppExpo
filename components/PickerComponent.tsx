import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface listType {
  id: string;
  name: string;
}

interface pickerType {
  selected: string;
  setSelected: (value: string) => void;
  listToPickFrom: listType[];
}

const PickerComponent = ({ selected, setSelected, listToPickFrom }: pickerType) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selected}
        onValueChange={(value) => setSelected(value)}
        style={styles.picker}
      >
        <Picker.Item
          label="Select a Shopping list"
          value={undefined}
          style={styles.pickerItem}
        />
        {
          listToPickFrom.map((list: listType) => (
            <Picker.Item
              key={list.id}
              label={list.name}
              value={list.id}
              style={styles.pickerItem}
            />
          ))
        }
      </Picker>
    </View>
  )
}

export default PickerComponent

const styles = StyleSheet.create({
  pickerContainer: {
    borderRadius: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: '#bdc3c7',
    overflow: 'hidden',
    marginTop: 20,
  },
  picker: {
    width: "100%",
    backgroundColor: "#E9DCC9",
    color: "#4f676bff",
    fontSize: 18,
  },
  pickerItem: {
    width: "70%",
    color: "#4f676bff",
    borderRadius: 4,
    fontSize: 18,
  }
})