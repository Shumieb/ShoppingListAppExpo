import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const ShoppingListDetails = () => {

  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>ShoppingListDetails - {id}</Text>
    </View>
  )
}

export default ShoppingListDetails