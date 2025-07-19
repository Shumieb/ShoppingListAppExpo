import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CardProps {
    title: string,
    id: string
}

const ListCard = ({title, id}: CardProps) => {

    const router = useRouter();

    const showShoppingList = () =>{
        router.replace(`/details/${id}`)
    }

  return (
    <TouchableOpacity 
        style={styles.card}
        onPress={showShoppingList}
    >
        <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ListCard

const styles = StyleSheet.create({
    card:{
        marginBottom: 15,
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        backgroundColor: "#c04621ff",
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderRadius: 4,
        marginLeft: 12,
        height: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    cardTitle:{
        color: "#E9DCC9",
        fontSize: 18,
        fontWeight: "bold"
    }
})