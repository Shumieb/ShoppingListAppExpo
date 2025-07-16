import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import Checkbox from 'expo-checkbox'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CardProps {
    title: string,
    id: string,
    completed: boolean,
    toggleItemCompleted: (id:string) => void,
}

const ListItemCard = ({title, id, completed, toggleItemCompleted}: CardProps) => {

    const [isChecked, setIsChecked] = useState(completed);

    const setChecked = () => {
        setIsChecked(!isChecked);
        toggleItemCompleted(id);
    }

    const editItem = () =>{
        console.log("edit item");
    }

    const deleteItem = () =>{
        console.log("delete item");
    }

  return (
    <View style={styles.card}>
        <View style={styles.titles}>
            <Checkbox 
                style={styles.checkbox} 
                value={isChecked} 
                color={isChecked ? "#3d3737ff":"white"}
                onValueChange={setChecked}
            />
            <Text style={[styles.cardTitle, isChecked ? styles.cardCompleted: null]}>{title}</Text>
        </View>     
        <View style={styles.cardBtns}>
            <TouchableOpacity 
                style={styles.btn}
                onPress={editItem}
            >
                <Feather name="edit" size={22} color="#c1dde0ff" />
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.btn}
                onPress={deleteItem}
            >
                <Ionicons name="trash" size={22} color="#f4b4b4ff" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ListItemCard

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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cardTitle:{
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 4
    },
    cardCompleted:{
        color: "#3d3737ff",
        fontStyle: "italic"
    },
    cardBtns:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    titles:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    btn:{
        marginHorizontal: 3,
    },
    checkbox:{
        margin: 8,
    }
})